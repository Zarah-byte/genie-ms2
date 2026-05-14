import { describe, expect, it } from "vitest";
import { mockPeople, mockRelationships, mockStories } from "./mock-data";

describe("demo tree mock data", () => {
  it("provides people and relationships for tree rendering", () => {
    expect(mockPeople.length).toBeGreaterThan(0);
    expect(mockRelationships.length).toBeGreaterThan(0);
  });

  it("only references valid people ids in relationships", () => {
    const peopleIds = new Set(mockPeople.map((person) => person.id));

    for (const relationship of mockRelationships) {
      expect(peopleIds.has(relationship.person_one_id)).toBe(true);
      expect(peopleIds.has(relationship.person_two_id)).toBe(true);
    }
  });

  it("keeps story person links aligned with known people", () => {
    const peopleIds = new Set(mockPeople.map((person) => person.id));

    for (const story of mockStories) {
      for (const personId of story.person_ids ?? []) {
        expect(peopleIds.has(personId)).toBe(true);
      }
    }
  });
});
