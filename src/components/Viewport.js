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
    if(props.wheel) { viewport.wheel({
      percent: 0.05,
      smooth: 2
    }); }
    if(props.decelerate) { viewport.decelerate({
      friction: 0.75
    }); }
    viewport.fitHeight(1333);
    viewport.snap(500, 500,
      {
        time: 500,
        removeOnComplete: true,
        removeOnInterrupt: true
      }
    );
    viewport.clampZoom({
      minWidth: 800,
      minHeight: 800,
      maxWidth: props.app.renderer.width * 2.2,
      maxHeight: props.app.renderer.height * 2.2
    });
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
          minWidth: 800,
          minHeight: 800,
          maxWidth: newProps.app.renderer.width * 2,
          maxHeight: newProps.app.renderer.height * 2
        });
      }
      if(
        oldProps.triggerDate !== newProps.triggerDate
      ) {
        viewport.snap(
          (newProps.snapX ? newProps.snapX : 500),
          (newProps.snapY ? newProps.snapY : 500),
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
