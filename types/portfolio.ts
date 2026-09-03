import { portfolioConfig } from "@/portfolio.config";

export type PortfolioConfig = typeof portfolioConfig;
export type Project = PortfolioConfig["featuredProjects"][number];
export type Achievement = PortfolioConfig["achievements"][number];
export type SkillGroupKey = keyof PortfolioConfig["skills"];
