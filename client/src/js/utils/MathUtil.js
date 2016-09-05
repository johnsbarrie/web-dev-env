
/**
 MathUtils class with static methods
*/

export default class  MathUtil{

    static rndRange (min, max) {
        return min + (Math.random() * (max - min));
    }

    static rndIntRange(min, max) {
        return Math.round(MathUtil.rndRange(min, max));
    }

    static toRadians = function(degrees) {
        return degrees * MathUtil.RADIANS;
    }

    static toDegrees = function(radians) {
        return radians * MathUtil.DEGREES;
    }

    static hitTest = function(x1, y1, w1, h1, x2, y2, w2, h2) {
        if (x1 + w1 > x2)
            if (x1 < x2 + w2)
                if (y1 + h1 > y2)
                    if (y1 < y2 + h2)
                        return true;

        return false;
    }

    static RADIANS = Math.PI / 180;
    static DEGREES = 180 / Math.PI;

}