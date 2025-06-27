"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const admin = require("@strapi/strapi/admin");
const reactRouterDom = require("react-router-dom");
const react = require("react");
const index = require("./index-CIGCXNKp.js");
const designSystem = require("@strapi/design-system");
const HomePage = () => {
  const { toggleNotification } = admin.useNotification();
  const { get } = admin.useFetchClient();
  const [busy, setBusy] = react.useState(false);
  const triggerPublish = async () => {
    if (busy === true) return;
    setBusy(true);
    try {
      const { data } = await get(`/${index.PLUGIN_ID}/publish`);
      if (data?.success !== true) {
        handleError({ message: "call not succeded" });
      } else {
        handleSuccess();
      }
    } catch (e) {
      handleError(e);
    }
  };
  const handleSuccess = () => {
    toggleNotification({
      type: "success",
      message: "Pipeline launched ! Check it on GitLab to see progress."
    });
  };
  const handleError = (e) => {
    toggleNotification({
      type: "danger",
      message: `Error during process : ${e.message}`
    });
    setBusy(false);
    throw new Error(e);
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(admin.Layouts.Root, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(admin.Page.Title, { children: "GitLab Publish" }),
    /* @__PURE__ */ jsxRuntime.jsxs(admin.Page.Main, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        admin.Layouts.Header,
        {
          title: "GitLab Publish",
          subtitle: "Trigger GitLab pipeline in one click !"
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(admin.Layouts.Content, { children: /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.Button,
        {
          onClick: triggerPublish,
          startIcon: null,
          type: "button",
          variant: "primary",
          disabled: busy === true,
          children: "Deploy"
        }
      ) })
    ] })
  ] });
};
const App = () => {
  return /* @__PURE__ */ jsxRuntime.jsxs(reactRouterDom.Routes, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Route, { index: true, element: /* @__PURE__ */ jsxRuntime.jsx(HomePage, {}) }),
    /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Route, { path: "*", element: /* @__PURE__ */ jsxRuntime.jsx(admin.Page.Error, {}) })
  ] });
};
exports.App = App;
