import useSWR from "swr";

const fetcher = (key) => {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : [];
};

export function useLocalSWR(key) {
  const { data = [], mutate } = useSWR(key, () => fetcher(key));

  function set(newValue) {
    localStorage.setItem(key, JSON.stringify(newValue));
    window.dispatchEvent(new CustomEvent("localUpdate", { detail: { key } }));
    mutate(newValue, false);
  }

  window.addEventListener("localUpdate", (e) => {
    if (e.detail.key === key) {
      mutate(fetcher(key), false);
    }
  });

  return { data, set, mutate };
}
