import { RefObject, useEffect, useMemo, useState } from 'react'

type UseIsInViewportProps = {
    ref: RefObject<HTMLElement | null>;
};
  
const useIsInViewport = ({ref}: UseIsInViewportProps) => {
    const [isIntersecting, setIsIntersecting] = useState(false);

    const observer = useMemo(
      () =>
        new IntersectionObserver(([entry]) =>
          setIsIntersecting(entry.isIntersecting),
        ),
      [],
    );
  
    useEffect(() => {
        if (ref.current && ref.current instanceof Element) {
            observer.observe(ref.current);
        }
  
      return () => {
        observer.disconnect();
      };
    }, [ref, observer]);
  
    return isIntersecting;
}

export default useIsInViewport