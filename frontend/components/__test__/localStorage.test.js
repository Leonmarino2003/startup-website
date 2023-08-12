describe("Change Currency", () => {
  it("adds item to local storage", () => {
    const spyLoStoSet = jest.spyOn(localStorage, "setItem");
    window.localStorage.setItem("currency", "SEK");
    expect(spyLoStoSet).toHaveBeenCalled();
    expect(spyLoStoSet).toHaveBeenCalledTimes(1);
  });

  it("adds item to local storage", () => {
    const spyLoStoGet = jest.spyOn(localStorage, "getItem");
    window.localStorage.setItem("currency", "SEK");
    window.localStorage.getItem("currency");
    expect(spyLoStoGet).toHaveBeenCalled();
    expect(spyLoStoGet).toHaveBeenCalledTimes(1);
  });

  it("removes item from local storage", () => {
    const spyLoStoRemove = jest.spyOn(localStorage, "removeItem");
    window.localStorage.removeItem("currency");
    expect(spyLoStoRemove).toHaveBeenCalled();
    expect(spyLoStoRemove).toHaveBeenCalledTimes(1);
  });

  it("clears local storage", () => {
    const spyLoStoClear = jest.spyOn(localStorage, "clear");
    window.localStorage.setItem("currency", "SEK");
    window.localStorage.clear();
    expect(spyLoStoClear).toHaveBeenCalled();
    expect(spyLoStoClear).toHaveBeenCalledTimes(1);
  });
});
