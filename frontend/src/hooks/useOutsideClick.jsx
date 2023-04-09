/**
 * ref로 지정한 요소 외부를 클릭할 시 callback함수를 실행
 */
import { useEffect } from 'react';

function useOutsideClick(ref, callback) {
  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback?.();
      }
    };

    window.addEventListener('mousedown', handleClick);

    return () => window.removeEventListener('mousedown', handleClick);
  }, [ref, callback]);
}

export default useOutsideClick;
