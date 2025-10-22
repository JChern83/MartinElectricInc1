import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Gallery, Item } from "react-photoswipe-gallery";

const slides = [
  { src: "/assets/kitchen.jpg",        caption: "Custom kitchen lighting & island" },
  { src: "/assets/service-panels.jpg", caption: "Service panel upgrade" },
  { src: "/assets/multimeter.jpg",     caption: "Multi-meter installation" },
  { src: "/assets/rewire.jpg",      caption: "rewiring" },
  { src: "/assets/rtu-disconnect.jpg", caption: "Rooftop unit with disconnect" },
  { src: "/assets/chandelier.jpg",     caption: "Custom chandelier install" },
];

export default function ProjectCarousel() {
  return (
    <Gallery>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        loop
        className="rounded-2xl overflow-hidden ring-1 ring-black/5"
      >
        {slides.map((s, i) => (
          <SwiperSlide key={i}>
            <Item original={s.src} thumbnail={s.src} width="1600" height="1067">
              {({ ref, open }) => (
                <figure className="relative">
                  <img
                    ref={ref}
                    onClick={open}
                    src={s.src}
                    alt={s.caption}
                    className="w-full h-[840px] object-cover cursor-zoom-in"
                  />
                  <figcaption className="absolute bottom-0 inset-x-0 bg-black/50 text-white text-sm p-3">
                    {s.caption}
                  </figcaption>
                </figure>
              )}
            </Item>
          </SwiperSlide>
        ))}
      </Swiper>
    </Gallery>
  );
}
