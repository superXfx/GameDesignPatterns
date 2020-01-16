
export default class CommonUtils {

    private static mInstance: CommonUtils = null;

    private CommonUtils(){};

    public static getInstance()
    {
        if(this.mInstance === null)
        {
            this.mInstance = new CommonUtils();
        }

        return this.mInstance;
    }

    //生成从minNum到maxNum的随机数
    public randomNum(minNum, maxNum){ 
        switch(arguments.length){ 
            case 1: 
                return parseInt(String(Math.random()*minNum+1),10); 
            break;
            case 2: 
                return parseInt(String(Math.random()*(maxNum-minNum+1)+minNum),10); 
            break;
                default: 
                    return 0;
                break; 
        } 
    }

    public getPointDistance(begin: cc.Vec2, end: cc.Vec2)
    {
        return Math.sqrt( Math.pow(begin.x - end.x, 2) + Math.pow(begin.y - end.y, 2) );
    }
}
