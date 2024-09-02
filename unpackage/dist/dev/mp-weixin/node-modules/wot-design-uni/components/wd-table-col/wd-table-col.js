"use strict";
const common_vendor = require("../../../../common/vendor.js");
const __default__ = {
  name: "wd-table-col",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: common_vendor.tableColumnProps,
  setup(__props, { expose: __expose }) {
    const props = __props;
    const { parent: table, index: columnIndex } = common_vendor.useParent(common_vendor.TABLE_KEY);
    const sortDirection = common_vendor.ref(0);
    const stripe = common_vendor.computed(() => {
      if (common_vendor.isDef(table)) {
        return table.props.stripe;
      } else {
        return false;
      }
    });
    const border = common_vendor.computed(() => {
      if (common_vendor.isDef(table)) {
        return table.props.border;
      } else {
        return false;
      }
    });
    const ellipsis = common_vendor.computed(() => {
      if (common_vendor.isDef(table)) {
        return table.props.ellipsis;
      } else {
        return false;
      }
    });
    const isLastFixed = common_vendor.computed(() => {
      let isLastFixed2 = false;
      if (props.fixed && common_vendor.isDef(table)) {
        isLastFixed2 = table.getIsLastFixed(props);
      }
      return isLastFixed2;
    });
    const columnStyle = common_vendor.computed(() => {
      let style = {};
      if (common_vendor.isDef(props.width)) {
        style["width"] = common_vendor.addUnit(props.width);
      }
      if (props.fixed && common_vendor.isDef(table) && common_vendor.isFunction(table.getFixedStyle)) {
        style = table.getFixedStyle(columnIndex.value, style);
      }
      return style;
    });
    const cellStyle = common_vendor.computed(() => {
      let style = {};
      const rowHeight = common_vendor.isDef(table) ? table.props.rowHeight : "80rpx";
      if (common_vendor.isDef(rowHeight)) {
        style["height"] = common_vendor.addUnit(rowHeight);
      }
      if (props.fixed && common_vendor.isDef(table) && common_vendor.isFunction(table.getFixedStyle)) {
        style = table.getFixedStyle(columnIndex.value, style);
      }
      return common_vendor.objToStyle(style);
    });
    const column = common_vendor.computed(() => {
      if (!common_vendor.isDef(table)) {
        return [];
      }
      const column2 = table.props.data.map((item) => {
        return item[props.prop];
      });
      return column2;
    });
    function handleRowClick(index) {
      if (!common_vendor.isDef(table)) {
        return;
      }
      common_vendor.isFunction(table.rowClick) && table.rowClick(index);
    }
    function getScope(index) {
      if (!common_vendor.isDef(table)) {
        return {};
      }
      return table.props.data[index] || {};
    }
    __expose({ sortDirection });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(column.value, (row, index, i0) => {
          return common_vendor.e(_ctx.$slots.value ? {
            a: "value-" + i0,
            b: common_vendor.r("value", {
              row: getScope(index),
              index
            }, i0)
          } : {
            c: common_vendor.t(row),
            d: common_vendor.n(`wd-table__value ${ellipsis.value ? "is-ellipsis" : ""}`)
          }, {
            e: common_vendor.n(`wd-table__cell ${stripe.value && common_vendor.unref(common_vendor.isOdd)(index) ? "is-stripe" : ""} ${border.value ? "is-border" : ""} is-${_ctx.align}`),
            f: index,
            g: common_vendor.o(($event) => handleRowClick(index), index)
          });
        }),
        b: _ctx.$slots.value,
        c: common_vendor.s(cellStyle.value),
        d: common_vendor.n(`wd-table-col ${_ctx.fixed ? "wd-table-col--fixed" : ""} ${isLastFixed.value && common_vendor.unref(common_vendor.isDef)(common_vendor.unref(table)) && common_vendor.unref(table).scrollLeft ? "is-shadow" : ""}`),
        e: common_vendor.s(columnStyle.value)
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-cdddaf22"]]);
wx.createComponent(Component);
