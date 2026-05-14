export default {
  multipass: true,
  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {
          removeUnknownsAndDefaults: {
            keepAriaAttrs: true,
            keepDataAttrs: true,
            keepRoleAttr: true
          }
        }
      }
    },
    {
      name: "removeViewBox",
      active: false
    }
  ]
};
