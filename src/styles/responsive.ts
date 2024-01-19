/* eslint-disable @typescript-eslint/no-explicit-any */
// antd의 grid에서 제공하는 화면 너비 프리셋 값입니다
// 참고: https://ant.design/components/grid#components-grid-demo-responsive
export const sm_lower_bound = 576;
export const md_lower_bound = 768;
export const lg_lower_bound = 992;
export const xl_lower_bound = 1200;
export const xxl_lower_bound = 1600;

interface AntdResponsiveValues {
  xs?: any;
  sm?: any;
  md?: any;
  lg?: any;
  xl?: any;
  xxl?: any;
}

export const getResponsiveValueByWindowWidth = (windowWidth: number, obj: AntdResponsiveValues) => {
  if ("xxl" in obj && windowWidth >= xxl_lower_bound) {
    return obj.xxl;
  } else if ("xl" in obj && windowWidth >= xl_lower_bound) {
    return obj.xl;
  } else if ("lg" in obj && windowWidth >= lg_lower_bound) {
    return obj.lg;
  } else if ("md" in obj && windowWidth >= md_lower_bound) {
    return obj.md;
  } else if ("sm" in obj && windowWidth >= sm_lower_bound) {
    return obj.sm;
  } else if ("xs" in obj && windowWidth) {
    return obj.xs;
  } else {
    return undefined;
  }
};
