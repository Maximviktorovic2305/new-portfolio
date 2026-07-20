/**
 * SVG filter that makes elements look hand-drawn / wobbly.
 * Mount once, then reference via filter="url(#sketchy)" on any element.
 */
export function SketchyFilter() {
  return (
    <svg className="absolute w-0 h-0" aria-hidden="true">
      <defs>
        <filter id="sketchy">
          <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="3" result="noise" seed="2" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="2.5"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
        <filter id="sketchy-strong">
          <feTurbulence type="turbulence" baseFrequency="0.03" numOctaves="4" result="noise" seed="5" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="4"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
