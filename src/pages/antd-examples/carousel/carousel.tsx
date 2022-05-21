import { AntdComponents } from "../antd-components"
import { AntdCarouselAutoplay } from "./autoplay"
import { AntdCarouselBasic } from "./basic"
import { AntdCarouselFade } from "./fade"
import { AntdCarouselPosition } from "./position"

const components = [
{feature: "autoplay", component: <AntdCarouselAutoplay/>},
{feature: "basic", component: <AntdCarouselBasic/>},
{feature: "fade", component: <AntdCarouselFade/>},
{feature: "position", component: <AntdCarouselPosition/>},]

export const AntdCarousel = () => {
  return <AntdComponents main="carousel" components={components}/>
}