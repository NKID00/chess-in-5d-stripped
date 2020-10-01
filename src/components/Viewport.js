import { CustomPIXIComponent } from 'react-pixi-fiber';
import { Viewport as PixiViewport} from 'pixi-viewport';

const behavior = {
  customDisplayObject: (props) => {
    var viewport = new PixiViewport({
      screenWidth: props.app.renderer.width,
      screenHeight: props.app.renderer.height,
      worldWidth: props.worldWidth ? props.worldWidth : 1000,
      worldHeight: props.worldHeight ? props.worldHeight : 1000,
      ticker: props.app.ticker,
      interaction: props.app.renderer.plugins.interaction,
      stopPropagation: false,
      disableOnContextMenu: true
    });
    viewport.interactive = true;

    if(props.drag) { viewport.drag(); }
    if(props.pinch) { viewport.pinch({
      noDrag: false
    }); }
    if(props.wheel) { viewport.wheel(); }
    if(props.decelerate) { viewport.decelerate(); }
    viewport.fitHeight(133);
    viewport.snap(50, 50,
      {
        time: 0,
        removeOnComplete: true,
        removeOnInterrupt: true
      }
    );
    return viewport;
  },
  customApplyProps: (viewport, oldProps, newProps) => {
    if(oldProps && newProps) {
      if(
        oldProps.worldWidth !== newProps.worldWidth ||
        oldProps.worldHeight !== newProps.worldHeight
      ) {
        viewport.resize(
          newProps.app.renderer.width,
          newProps.app.renderer.height,
          newProps.worldWidth,
          newProps.worldHeight
        );
        viewport.clampZoom({
          minWidth: 80,
          minHeight: 80,
          maxWidth: newProps.app.renderer.width * 2,
          maxHeight: newProps.app.renderer.height * 2
        });
      }
      if(
        oldProps.snapX !== newProps.snapX ||
        oldProps.snapY !== newProps.snapY
      ) {
        viewport.snap(
          (newProps.snapX ? newProps.snapX : 50),
          (newProps.snapY ? newProps.snapY : 50),
          {
            time: 500,
            removeOnComplete: true,
            removeOnInterrupt: true
          }
        );
      }
      if(oldProps.zoomHeight !== newProps.zoomHeight) {
        var height = (newProps.zoomHeight ? newProps.zoomHeight : 133);
        if(viewport.worldScreenHeight < height) {
          viewport.snapZoom({
            height: height,
            time: 500,
            removeOnComplete: true,
            removeOnInterrupt: true
          });
        }
      }
    }
  },
  customWillDetach: (viewport) => { return viewport; }
};

const Viewport = CustomPIXIComponent(behavior, 'Viewport');
export default Viewport;
