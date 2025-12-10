export default function ResetStorage() {
  localStorage.clear(); // clears all keys
  return (
    <div
      style={{
        fontSize: "20px",
        padding: "40px",
        textAlign: "center",
        color: "#333",
      }}
    >
      ✅ LocalStorage Cleared <br />
      Now go to <a href="/login">/login</a>
    </div>
  );
}
