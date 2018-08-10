/**
 * A quick hello world to check tests, compiling, and whatnot.
 */
export class HelloWorld {

    /**
     * Greets the passed thing.
     */
    public greetThing(thing: string) {
        console.log(`Hello, ${thing}!`);
    }

    /**
     * Greets the world.
     */
    public greetWorld() {
        this.greetThing("world");
    }
}
