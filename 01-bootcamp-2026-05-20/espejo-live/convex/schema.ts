import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  founders: defineTable({
    name: v.string(),
    company: v.string(),
    email: v.string(),
    sessionCode: v.string(),
  }).index("by_session", ["sessionCode"]),

  responses: defineTable({
    founderId: v.id("founders"),
    questionIndex: v.number(),
    questionText: v.string(),
    optionIndex: v.number(),
    optionText: v.string(),
    scores: v.any(),
  }).index("by_founder", ["founderId"]),

  results: defineTable({
    founderId: v.id("founders"),
    trampaKey: v.string(),
    trampaName: v.string(),
    cluster: v.string(),
    reframe: v.string(),
    actions: v.array(v.string()),
    sessionCode: v.string(),
  })
    .index("by_founder", ["founderId"])
    .index("by_session", ["sessionCode"]),
});
