/** @type {import("stylelint").Config} */
export default {
  extends: ["stylelint-config-standard"],
  plugins: ["stylelint-order", "stylelint-selector-bem-pattern"],
  ignoreFiles: ["./dist/**", "./src/app/styles/*.css"],
  cache: true,
  rules: {
    "declaration-empty-line-before": null,
    "selector-class-pattern": null,
    "plugin/selector-bem-pattern": {
      preset: "bem",
      componentSelectors: {
        initial: "^\\.{componentName}(?:__[a-z]+(?:-[a-z]+)*)?(?:--[a-z]+(?:-[a-z]+)*)?$",
      },
    },
    // Сортируем свойства
    "order/properties-order": [
      [
        {
          groupName: "Позиционирование",
          emptyLineBefore: "always",
          properties: ["position", "z-index", "top", "right", "bottom", "left"],
          noEmptyLineBetween: true,
          order: "flexible",
        },
        {
          groupName: "Отображение",
          emptyLineBefore: "always",
          properties: [
            "display",
            "visibility",
            "overflow",
            "flex",
            "grid",
            "gap",
            "flex-direction",
            "flex-wrap",
            "flex-flow",
            "flex-grow",
            "flex-shrink",
            "flex-basis",
            "justify-content",
            "align-items",
            "align-content",
          ],
          noEmptyLineBetween: true,
          order: "flexible",
        },
        {
          groupName: "Размеры и отступы",
          emptyLineBefore: "always",
          properties: [
            "width",
            "height",
            "margin",
            "padding",
            "padding-top",
            "padding-right",
            "padding-bottom",
            "padding-left",
            "box-sizing",
          ],
          noEmptyLineBetween: true,
          order: "flexible",
        },
        {
          groupName: "Типографика",
          emptyLineBefore: "always",
          properties: ["font", "text-align", "text-decoration"],
          noEmptyLineBetween: true,
          order: "flexible",
        },
        {
          groupName: "Визуальное оформление",
          emptyLineBefore: "always",
          properties: ["color", "background-color", "border", "border-radius", "box-shadow"],
          noEmptyLineBetween: true,
          order: "flexible",
        },
        {
          groupName: "Анимации и трансформации",
          emptyLineBefore: "always",
          properties: ["transform", "animation", "transition"],
          noEmptyLineBetween: true,
          order: "flexible",
        },
      ],
      {
        unspecified: "bottomAlphabetical",
        emptyLineBeforeUnspecified: "always",
      },
    ],
    "declaration-property-value-no-unknown": null,
    "font-family-no-missing-generic-family-keyword": null,
    "no-descending-specificity": null,
    "keyframes-name-pattern": null,
    "declaration-property-value-keyword-no-deprecated": null
  },
};
