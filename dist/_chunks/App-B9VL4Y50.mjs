import { jsxs, jsx } from "react/jsx-runtime";
import { useNotification, useFetchClient, Layouts, Page } from "@strapi/strapi/admin";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { P as PLUGIN_ID } from "./index-C0AYCP83.mjs";
import { Button } from "@strapi/design-system";
const HomePage = () => {
  const { toggleNotification } = useNotification();
  const { get } = useFetchClient();
  const [busy, setBusy] = useState(false);
  const triggerPublish = async () => {
    if (busy === true) return;
    setBusy(true);
    try {
      const { data } = await get(`/${PLUGIN_ID}/publish`);
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
  return /* @__PURE__ */ jsxs(Layouts.Root, { children: [
    /* @__PURE__ */ jsx(Page.Title, { children: "GitLab Publish" }),
    /* @__PURE__ */ jsxs(Page.Main, { children: [
      /* @__PURE__ */ jsx(
        Layouts.Header,
        {
          title: "GitLab Publish",
          subtitle: "Trigger GitLab pipeline in one click !"
        }
      ),
      /* @__PURE__ */ jsx(Layouts.Content, { children: /* @__PURE__ */ jsx(
        Button,
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
  return /* @__PURE__ */ jsxs(Routes, { children: [
    /* @__PURE__ */ jsx(Route, { index: true, element: /* @__PURE__ */ jsx(HomePage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(Page.Error, {}) })
  ] });
};
export {
  App
};
