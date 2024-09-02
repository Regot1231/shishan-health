/**
 * declare module '@vue/runtime-core'
 *   现调整为
 * declare module 'vue'
 */
import XsSwiper from '@/components/whb-swiper.vue'
import 'vue'
declare module 'vue' {
  export interface GlobalComponents {
    XsSwiper: typeof XsSwiper
  }
}
