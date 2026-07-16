/** @type {import('@ladle/react').UserConfig} */
export default {
  stories: "components/**/*.stories.{js,jsx,ts,tsx}",
  port: 61000,
  defaultStory: "pillars--audit",
  appendToHead: '<link rel="icon" href="/icon.png" />',
};
