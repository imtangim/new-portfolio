const VOTER_KEY = "blog-voter-id";

export function getVoterId(): string {
  if (typeof window === "undefined") return "";
  try {
    let id = localStorage.getItem(VOTER_KEY);
    if (!id) {
      id =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `voter-${Date.now()}`;
      localStorage.setItem(VOTER_KEY, id);
    }
    return id;
  } catch {
    return `voter-${Date.now()}`;
  }
}
