const lintStagedConfig = {
  '*.{ts,tsx,js,jsx}': ['eslint --fix'],
  '*.{json,md,yml,yaml}': ['prettier --write'],
};

export default lintStagedConfig;
