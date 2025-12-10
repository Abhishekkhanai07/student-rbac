// Wrapper for localStorage with mutation events

export const storage = {
  get(key) {
    try {
      return JSON.parse(localStorage.getItem(key)) || null;
    } catch {
      return null;
    }
  },

  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent("localUpdate", { detail: { key } }));
  },

  updateArray(key, item, idField = "id") {
    const list = this.get(key) || [];
    const i = list.findIndex(x => x[idField] === item[idField]);
    if (i === -1) list.push(item);
    else list[i] = item;
    this.set(key, list);
    return list;
  },

  delete(key, id, idField = "id") {
    const list = this.get(key) || [];
    const newList = list.filter(x => x[idField] !== id);
    this.set(key, newList);
    return newList;
  }
};
