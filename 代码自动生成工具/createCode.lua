
local configFileName = "GameFSMConfig.json"
local cjson = require "cjson"

local fileSuffix
local relativePath
local ConstFileName

local makeEnumNames
local makeEnumFile
local makeStateFile
local makeFactoryFile

function run()

	os.execute('mkdir Script')
	os.execute('mkdir Script\\Ctrl')
	os.execute('mkdir Script\\GameState')
	os.execute('mkdir Script\\StateFactory')

	local jsonString = readfile("Config/"..configFileName)
	local jsonData = cjson.decode(jsonString)

	fileSuffix = jsonData.fileSuffix
	relativePath = jsonData.relativePath
	ConstFileName = "Const_State" .. jsonData.fileSuffix;
	mEnumNames = makeEnumNames(jsonData)

	makeEnumFile(jsonData)
	makeStateFile(jsonData)
	makeFactoryFile(jsonData)
	makeCtrlFile(jsonData)
end

makeEnumNames = function(jsonData)

	local mEnumNames = ""

	for enumName, states in pairs(jsonData.state) do

		mEnumNames = mEnumNames .. enumName ..", "
	end

	mEnumNames = mEnumNames .."}"
	return mEnumNames
end

makeEnumFile = function(jsonData)

	local content = ""

	for enumName, states in pairs(jsonData.state) do

		content = content .."\nexport enum ".. enumName .. "{\n"

		for key2, state in ipairs(states) do

			content = content .."    ".. state.stateName ..",\n"
		end

		content = content .. "}\n"
	end

	writefile("Script/"..ConstFileName .. ".ts", content)
end

makeStateFile = function(jsonData)


	local stateBase = "import StateBase from \""..relativePath.."Script/DesignPatterns/FSM/StateBase\";\n"
	local Enums = "import ".. "{" .. mEnumNames .. " from \"../"..ConstFileName.."\";\n"

	local importStr = ""
	importStr = importStr .. stateBase
	importStr = importStr .. Enums

	for stateType, var in pairs(jsonData.state) do


		local content = ""
		local StateFileName = stateType .. fileSuffix

		content = content .. importStr .."\n"

		for key2, stateData in ipairs(var) do

			content = content .. "export class "..stateData.stateName.."_"..stateType..fileSuffix.." extends StateBase{\
	public Enter(param?: any)\
	{\
		super.Enter(param);\n"

		for key3, func in ipairs(stateData.callFunc) do
			content = content .. "\t\tthis.mObjCtrl."..func..";\n"
		end

	content = content .. "\n\t}\
}\n\n"

		end
		writefile("Script/GameState/"..StateFileName..".ts", content)
	end
end

makeFactoryFile = function(jsonData)

	for stateType, var in pairs(jsonData.state) do

		local importStr = "\n"
		local factoryFileName = "StateFactory_"..stateType..fileSuffix;
		local StateFileName = stateType .. fileSuffix
		local stateClassImport = "import {\n "
		local cases = ""

		importStr = importStr .. "import StateBase from \""..relativePath.."Script/DesignPatterns/FSM/StateBase\";\n"
		importStr = importStr .. "import ".. "{" .. mEnumNames .. " from \"../"..ConstFileName.."\";\n"

		for key2, stateData in ipairs(var) do

			stateClassImport = stateClassImport .. "\t"..stateData.stateName.."_"..stateType..fileSuffix ..",\n"

			cases = cases.."\n\t\t\tcase "..stateType.."."..stateData.stateName..":\
				stateInstance = new "..stateData.stateName.."_"..StateFileName.."(stateType, objCtrl);\
			break;"
		end
		stateClassImport = stateClassImport .. "} \nfrom \"../GameState/"..stateType .. fileSuffix.."\";"

		importStr = importStr .. stateClassImport

		local content = "\n\nexport default class " .. factoryFileName .. " {\
	\
	private static mInstance: "..factoryFileName.." = null;\
	\
	static getInstance()\
	{\
		if(!this.mInstance)\
		{\
			this.mInstance = new "..factoryFileName.."();\
		}\n\
		return this.mInstance;\
	}\
	\
	public createState(stateType: "..stateType..", objCtrl): StateBase\
	{\
		let stateInstance = null;\
		switch(stateType)\
		{"
		..cases
		.."\n\t\t}\
		\
		return stateInstance;\
	}\
}"
		content = importStr .. content .."\n"

		writefile("Script/StateFactory/"..factoryFileName..".ts", content)
	end
end

makeCtrlFile = function(jsonData)

	for CtrlName, CtrlCfg in pairs(jsonData.ctrl) do

		local content = ""
		local CtrlFileName = CtrlName..fileSuffix;
		local FactoryFileName = "StateFactory_"..CtrlCfg.state..fileSuffix;
		local importStr = "\n"
		local params = ""
		local onlOadFunc = ""
		local startFunc = ""
		local registerMsgFunc = ""
		local unResgiterMsgFunc = ""
		local reset = ""
		local checkPass = ""
		local onCocosMessage = ""
		local selfFuncs = ""

		importStr = importStr .. "import StateMachine from \""..relativePath.."Script/DesignPatterns/FSM/StateMachine\";\n"
		importStr = importStr .. "import CtrlBase from \""..relativePath.."Script/DesignPatterns/FSM/CtrlBase\";\n"
		importStr = importStr .. "import CocosMessageMgr from \""..relativePath.."Script/DesignPatterns/Monitor/CocosMessageMgr\";\n"
		importStr = importStr .. "import * as Const_Msg_Monitor from \""..relativePath.."Script/DesignPatterns/Monitor/Const_Msg_Monitor\";\n"
		importStr = importStr .. "import ".."{".. mEnumNames .. " from \"../"..ConstFileName.."\";\n"
		importStr = importStr .. "import StateFactory".." from \"".."../StateFactory/"..FactoryFileName.."\";\n\n"

		params = ""
		onlOadFunc = "\
	onLoad() {\
		\
		super.onLoad();\
		this.clearState();\
	}\n"

		startFunc = ""

		registerMsgFunc = "\
		public registerMsg()\
		{\
			super.registerMsg();\
		}\n"

		unResgiterMsgFunc = "\
		public unResgiterMsg()\
		{\
			super.unResgiterMsg();\
		}\n"

		for key, param in ipairs(CtrlCfg.param) do
			print(param)
			params = params .."\t"..param..";\n";
		end


		if(CtrlName == "GameCtrl") then

			for CtrlName2, var2 in pairs(jsonData.ctrl) do
				if(CtrlName2 ~= "GameCtrl") then
					importStr = importStr .. "import "..CtrlName2.." from \"./"..CtrlName2..fileSuffix.."\";\n"
				end
			end

	--
		onlOadFunc = "\
	onLoad() {\
	\
		super.onLoad();\
	}\n"

	--
		startFunc = "\t\
	start()\
	{\
		this.changeState(eGameState.eInit, null);\
	}\n"

	--
		registerMsgFunc = "\
	public registerMsg()\
	{\
		super.registerMsg();\
		cc.systemEvent.on(Const_Msg_Monitor.MSG_CHANGE_GAME_STATE, this.onCocosMessage, this);\
	}\n"
	--
		unResgiterMsgFunc = "\
	public unResgiterMsg()\
	{\
		super.unResgiterMsg();\
		cc.systemEvent.off(Const_Msg_Monitor.MSG_CHANGE_GAME_STATE, this.onCocosMessage, this);\
	}\n"
	--
		reset = "\
	public reset(imm: boolean = false)\
	{\
		this.clearState();\
	}\n"
	--
		checkPass = "public checkPass()\
	{\
		return false;\
	}\n"
	--
		onCocosMessage = "\
	protected onCocosMessage(data): void\
	{\
		switch(data.msgId)\
		{\
			case Const_Msg_Monitor.MSG_CHANGE_GAME_STATE:\
				this.changeState(data.msgData.state);\
			break;\
		}\
	}\n"
		--

		end

		for key, func in ipairs(CtrlCfg.callFunc) do
			selfFuncs = selfFuncs .."\t"..func.."\n\t{\n\n\t}\n";
		end

		content = "\nconst { ccclass, property } = cc._decorator;\
		\
@ccclass\
export default class "..CtrlFileName.." extends CtrlBase{\
"..params
	..onlOadFunc
	..startFunc..
	"\
	protected init()\
	{\
		if(!this.mIsInit)\
		{\
			this.setFSM( new StateMachine( this, new StateFactory()) );\
			this.mIsInit = true;\
		}\
	}\
"
..registerMsgFunc
..unResgiterMsgFunc
..reset..
"\
	public clearState()\
	{\
		this.changeState("..CtrlCfg.state..".eInit);\
	}\n"
.."//-----------------------------\n"
..selfFuncs
..onCocosMessage
.."}\n"


		content = importStr .. content
		writefile("Script/Ctrl/"..CtrlFileName..".ts", content)
	end
end

--------------------conmmon functions
readfile = function (path)
      local file = io.open(path, "r")
      if file then
        local content = file:read("*a")
        io.close(file)
        return content
      end
      return nil
end

writefile =  function (path, content, mode)
      mode = mode or "w+b"
      local file = io.open(path, mode)
      if file then
        if file:write(content) == nil then return false end
        io.close(file)
        return true
      else
        return false
      end
end

run()

















