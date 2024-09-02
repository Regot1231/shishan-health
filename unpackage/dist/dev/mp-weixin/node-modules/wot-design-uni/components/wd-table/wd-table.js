"use strict";
const common_vendor = require("../../../../common/vendor.js");
if (!Array) {
  const _easycom_wd_sort_button2 = common_vendor.resolveComponent("wd-sort-button");
  _easycom_wd_sort_button2();
}
const _easycom_wd_sort_button = () => "../wd-sort-button/wd-sort-button.js";
if (!Math) {
  (_easycom_wd_sort_button + WdTableCol)();
}
const WdTableCol = () => "../wd-table-col/wd-table-col.js";
const __default__ = {
  name: "wd-table",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: common_vendor.tableProps,
  emits: ["sort-method", "row-click"],
  setup(__props, { emit: __emit }) {
    const { translate } = common_vendor.useTranslate("tableCol");
    const props = __props;
    const emit = __emit;
    const reactiveState = common_vendor.reactive({
      props,
      scrollLeft: 0,
      rowClick,
      getIsLastFixed,
      getFixedStyle
    });
    const { linkChildren, children } = common_vendor.useChildren(common_vendor.TABLE_KEY);
    linkChildren(reactiveState);
    const indexUUID = common_vendor.uuid();
    const indexColumn = common_vendor.ref({
      prop: indexUUID,
      label: translate("indexLabel"),
      width: "100rpx",
      sortable: false,
      fixed: false,
      align: "left",
      ...common_vendor.isObj(props.index) ? props.index : {}
    });
    const scroll = common_vendor.debounce(handleScroll, 100, { leading: false });
    const tableStyle = common_vendor.computed(() => {
      const style = {};
      if (common_vendor.isDef(props.height)) {
        style["max-height"] = common_vendor.addUnit(props.height);
      }
      return `${common_vendor.objToStyle(style)};${props.customStyle}`;
    });
    const realWidthStyle = common_vendor.computed(() => {
      const style = {
        display: "flex"
      };
      let width = "";
      children.forEach((child) => {
        width = width ? `${width} + ${common_vendor.addUnit(child.width)}` : common_vendor.addUnit(child.width);
      });
      style["width"] = `calc(${width})`;
      return common_vendor.objToStyle(style);
    });
    const bodyStyle = common_vendor.computed(() => {
      const style = {};
      if (common_vendor.isDef(props.height)) {
        style["height"] = common_vendor.isDef(props.rowHeight) ? `calc(${props.data.length} * ${common_vendor.addUnit(props.rowHeight)})` : `calc(${props.data.length} * 50px)`;
      }
      return `${common_vendor.objToStyle(style)};`;
    });
    function getIsLastFixed(column) {
      let isLastFixed = false;
      if (column.fixed && common_vendor.isDef(children)) {
        const columns = children.filter((child) => {
          return child.fixed;
        });
        if (columns.length && columns[columns.length - 1].prop === column.prop) {
          isLastFixed = true;
        }
      }
      return isLastFixed;
    }
    function getCellStyle(columnIndex) {
      let style = {};
      if (common_vendor.isDef(children[columnIndex].width)) {
        style["width"] = common_vendor.addUnit(children[columnIndex].width);
      }
      if (children[columnIndex].fixed) {
        style = getFixedStyle(columnIndex, style);
      }
      return common_vendor.objToStyle(style);
    }
    function getFixedStyle(columnIndex, style) {
      if (columnIndex > 0) {
        let left = "";
        children.forEach((column, index) => {
          if (index < columnIndex) {
            left = left ? `${left} + ${common_vendor.addUnit(column.width)}` : common_vendor.addUnit(column.width);
          }
        });
        style["left"] = `calc(${left})`;
      } else {
        style["left"] = 0;
      }
      return style;
    }
    function handleSortChange(value, index) {
      children[index].$.exposed.sortDirection.value = value;
      children.forEach((col, i) => {
        if (index != i) {
          col.$.exposed.sortDirection.value = 0;
        }
      });
      const column = {
        // 列对应字段
        prop: children[index].prop,
        // 列对应字段标题
        label: children[index].label,
        // 列宽度
        width: children[index].width,
        // 是否开启列排序
        sortable: children[index].sortable,
        // 列的对齐方式，可选值left,center,right
        align: children[index].align,
        // 列的排序方向
        sortDirection: value,
        // 是否i固定列
        fixed: children[index].fixed
      };
      emit("sort-method", column);
    }
    function handleScroll(event) {
      if (!props.showHeader) {
        return;
      }
      reactiveState.scrollLeft = event.detail.scrollLeft;
    }
    function rowClick(index) {
      emit("row-click", { rowIndex: index });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: _ctx.showHeader
      }, _ctx.showHeader ? {
        b: common_vendor.f(common_vendor.unref(children), (column, index, i0) => {
          return common_vendor.e({
            a: column.sortable
          }, column.sortable ? {
            b: common_vendor.o(({
              value
            }) => handleSortChange(value, index), index),
            c: "d423803e-0-" + i0,
            d: common_vendor.o(($event) => column.$.exposed.sortDirection.value = $event, index),
            e: common_vendor.p({
              ["allow-reset"]: true,
              line: false,
              title: column.label,
              modelValue: column.$.exposed.sortDirection.value
            })
          } : {
            f: common_vendor.t(column.label),
            g: common_vendor.n(`wd-table__value ${_ctx.ellipsis ? "is-ellipsis" : ""}`)
          }, {
            h: common_vendor.n(`wd-table__cell ${_ctx.border ? "is-border" : ""} ${column.fixed ? "is-fixed" : ""} ${_ctx.stripe ? "is-stripe" : ""} is-${column.align} ${getIsLastFixed(column) && reactiveState.scrollLeft ? "is-shadow" : ""}`),
            i: common_vendor.s(getCellStyle(index)),
            j: index
          });
        }),
        c: common_vendor.s(realWidthStyle.value),
        d: reactiveState.scrollLeft,
        e: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(scroll) && common_vendor.unref(scroll)(...args)
        )
      } : {}, {
        f: _ctx.index !== false
      }, _ctx.index !== false ? {
        g: common_vendor.w(({
          index
        }, s0, i0) => {
          return {
            a: common_vendor.t(index + 1),
            b: i0,
            c: s0
          };
        }, {
          name: "value",
          path: "g",
          vueId: "d423803e-1"
        }),
        h: common_vendor.p({
          prop: indexColumn.value.prop,
          label: indexColumn.value.label,
          width: indexColumn.value.width,
          sortable: indexColumn.value.sortable,
          fixed: indexColumn.value.fixed,
          align: indexColumn.value.align
        })
      } : {}, {
        i: common_vendor.s(realWidthStyle.value),
        j: common_vendor.s(bodyStyle.value),
        k: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(scroll) && common_vendor.unref(scroll)(...args)
        ),
        l: reactiveState.scrollLeft,
        m: common_vendor.n(`wd-table ${_ctx.border ? "is-border" : ""} ${_ctx.customClass}`),
        n: common_vendor.s(tableStyle.value)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d423803e"]]);
wx.createComponent(Component);
