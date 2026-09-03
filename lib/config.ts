import { portfolioConfig } from "@/portfolio.config";

export const config = portfolioConfig;

export const sortedProjects = [...config.featuredProjects].sort((a, b) => a.order - b.order);

export const enabledNavigation = config.navigation.filter((item) => item.href && item.title);

export const socialLinks = Object.entries(config.socials).flatMap(([key, value]) => {
  if (typeof value === "string") {
    return value ? [{ key, label: key, url: value }] : [];
  }

  return value.url && value.url !== "TODO"
    ? [{ key, label: key, url: value.url, username: "username" in value ? value.username : undefined }]
    : [];
});
