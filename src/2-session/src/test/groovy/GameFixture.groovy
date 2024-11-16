trait GameFixture implements CellFixture {
    Game firstGame = [
        cells: [
            (new CellId(0, 0)): firstCell,
            (new CellId(1, 1)): secondCell,
            (new CellId(42, 1337)): thirdCell,
        ]
    ]
}