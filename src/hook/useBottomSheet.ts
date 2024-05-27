import {useRef, useEffect} from 'react';


interface BottomSheetMetrics {
    touchStart: {
        sheetY: number;
        touchY: number;
    };
    touchMove: {
        prevTouchY?: number;
        movingDirection: "none" | "down" | "up";
    };
    isContentAreaTouched: boolean;
}

// 바텀시트가 최소로 높이 올라갔을 때의 y 값
// 바텀시트가 최소로 내려갔을 때의 y 값
// 바텀시트의 세로 길이
function useBottomSheet(minY: number, maxY: number) {

    const sheet = useRef<HTMLDivElement>(null);

    const content = useRef<HTMLDivElement>(null);

    const metrics = useRef<BottomSheetMetrics>({
        touchStart: {
            sheetY: 0,
            touchY: 0,
        },
        touchMove: {
            prevTouchY: 0,
            movingDirection: "none",
        },
        isContentAreaTouched: false
    });


    useEffect(() => {
        const canUserMoveBottomSheet = () => {
            const {touchMove, isContentAreaTouched} = metrics.current;


            if (!isContentAreaTouched) {
                return true;
            }

            if (sheet.current?.getBoundingClientRect().y !== minY) {
                return true;
            }

            if (touchMove.movingDirection === 'down' && content.current) {
                return content.current.scrollTop <= 0;
            }
            return false;
        }

        const handleTouchStart = (e: TouchEvent) => {
            const {touchStart} = metrics.current;
            if (sheet.current) {
                touchStart.sheetY = sheet.current?.getBoundingClientRect().y;
            }
            touchStart.touchY = e.touches[0].clientY;
        };

        const handleTouchMove = (e: TouchEvent) => {

            const {touchStart, touchMove} = metrics.current;
            const currentTouch = e.touches[0];

            if (touchMove.prevTouchY === undefined) {
                touchMove.prevTouchY = touchStart.touchY;
            }

            if (touchMove.prevTouchY === 0) {
                // 맨 처음 앱 시작하고 시작시
                touchMove.prevTouchY = touchStart.touchY;
            }

            if (touchMove.prevTouchY < currentTouch.clientY) {
                touchMove.movingDirection = 'down';
            }

            if (touchMove.prevTouchY > currentTouch.clientY) {
                touchMove.movingDirection = 'up';
            }

            if (canUserMoveBottomSheet()) {

                e.preventDefault();

                const touchOffset = currentTouch.clientY - touchStart.touchY;
                let nextSheetY = touchStart.sheetY + touchOffset;

                if (nextSheetY <= minY) {
                    nextSheetY = minY;
                }

                if (nextSheetY >= maxY) {
                    nextSheetY = maxY;
                }

                sheet.current?.style.setProperty('transform', `translateY(${nextSheetY - maxY}px)`);
            } else {
                document.body.style.overflowY = 'hidden';
            }
        };

        const handleTouchEnd = (e: TouchEvent) => {
            document.body.style.overflowY = 'auto';
            const {touchMove} = metrics.current;

            // Snap Animation
            const currentSheetY = sheet.current?.getBoundingClientRect().y;

            if (currentSheetY !== minY) {
                if (touchMove.movingDirection === 'down') {
                    sheet.current?.style.setProperty('transform', 'translateY(0)');
                }

                if (touchMove.movingDirection === 'up') {
                    sheet.current?.style.setProperty('transform', `translateY(${minY - maxY}px)`);
                }
            }

            // metrics 초기화.
            metrics.current = {
                touchStart: {
                    sheetY: 0,
                    touchY: 0,
                },
                touchMove: {
                    prevTouchY: 0,
                    movingDirection: "none",
                },
                isContentAreaTouched: false
            };
        }

        const handleResize = () => {
            sheet.current?.style.setProperty('height', `${window.innerHeight - minY}px`);
        }

        sheet.current?.addEventListener('touchstart', handleTouchStart);
        sheet.current?.addEventListener('touchmove', handleTouchMove);
        sheet.current?.addEventListener('touchend', handleTouchEnd);
        sheet.current?.addEventListener('touchend', handleTouchEnd);
        window.addEventListener("resize", handleResize);

        sheet.current?.style.setProperty('top', `${window.innerHeight - maxY}px`);
        sheet.current?.style.setProperty('height', `${window.innerHeight - minY}px`);

        return () => {
            sheet.current?.removeEventListener('touchstart', handleTouchStart);
            sheet.current?.removeEventListener('touchmove', handleTouchMove);
            sheet.current?.removeEventListener('touchend', handleTouchEnd);
            window.removeEventListener("resize", handleResize);
        }

    }, [])


    useEffect(() => {
        const handleTouchStart = () => {
            if (metrics.current) {
                metrics.current.isContentAreaTouched = true;
            }
        }
        content.current?.addEventListener('touchstart', handleTouchStart);

        return () => {
            content.current?.removeEventListener('touchstart', handleTouchStart);
        }
    }, []);

    return {sheet, content}

}


export default useBottomSheet;
