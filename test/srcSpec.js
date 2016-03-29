describe("A suite of basic functions", function() {
    it("reverse word",function() {
        expect("DCBA").toEqual(reverse("ABCD"));
    });

    it("add fn",function() {
        expect(7).toEqual(add(3, 4));
    });
    
});