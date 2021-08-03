export function songExists(song: object, array: object[]): boolean {
  return (
    array.filter((value) => {
      return (
        value["song"] === song["song"] &&
        value["artist"] === song["artist"] &&
        value["album"] === song["album"] &&
        value["file"] === song["file"]
      );
    }).length > 0
  );
}
