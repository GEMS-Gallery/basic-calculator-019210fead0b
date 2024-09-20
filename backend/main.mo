import Float "mo:base/Float";

actor Calculator {
    // Add two numbers
    public func add(x : Float, y : Float) : async Float {
        x + y
    };

    // Subtract two numbers
    public func subtract(x : Float, y : Float) : async Float {
        x - y
    };

    // Multiply two numbers
    public func multiply(x : Float, y : Float) : async Float {
        x * y
    };

    // Divide two numbers
    public func divide(x : Float, y : Float) : async ?Float {
        if (y == 0) {
            null // Return null for division by zero
        } else {
            ?(x / y)
        }
    };
}
