import { describe, expect, it } from "vitest";
import {
  getArchivePeople,
  getArchiveRelationships,
  getArchiveStories
} from "./archive-data";
import { mockPeople, mockRelationships, mockStories } from "./mock-data";

describe("archive data fallbacks", () => {
  it("returns mock records when archive id is missing", async () => {
    await expect(getArchivePeople(undefined)).resolves.toEqual(mockPeople);
    await expect(getArchiveRelationships(undefined)).resolves.toEqual(mockRelationships);
    await expect(getArchiveStories(undefined)).resolves.toEqual(mockStories);
  });
});
