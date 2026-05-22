import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const register = mutation({
  args: {
    name: v.string(),
    company: v.string(),
    email: v.string(),
    sessionCode: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("founders", args);
  },
});

export const saveResponse = mutation({
  args: {
    founderId: v.id("founders"),
    questionIndex: v.number(),
    questionText: v.string(),
    optionIndex: v.number(),
    optionText: v.string(),
    scores: v.any(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("responses", args);
  },
});

export const saveResult = mutation({
  args: {
    founderId: v.id("founders"),
    trampaKey: v.string(),
    trampaName: v.string(),
    cluster: v.string(),
    reframe: v.string(),
    actions: v.array(v.string()),
    sessionCode: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("results", args);
  },
});

export const listResultsBySession = query({
  args: { sessionCode: v.string() },
  handler: async (ctx, { sessionCode }) => {
    const results = await ctx.db
      .query("results")
      .withIndex("by_session", (q) => q.eq("sessionCode", sessionCode))
      .collect();

    return await Promise.all(
      results.map(async (r) => {
        const founder = await ctx.db.get(r.founderId);
        return { ...r, founder };
      })
    );
  },
});

export const getResponsesByFounder = query({
  args: { founderId: v.id("founders") },
  handler: async (ctx, { founderId }) => {
    return await ctx.db
      .query("responses")
      .withIndex("by_founder", (q) => q.eq("founderId", founderId))
      .collect();
  },
});
