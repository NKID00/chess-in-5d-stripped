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
      stopPropagation: false
    });
    viewport.interactive = true;

    if(props.drag) { viewport.drag(); }
    if(props.pinch) { viewport.pinch(); }
    if(props.wheel) { viewport.wheel(); }
    if(props.decelerate) { viewport.decelerate(); }
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
        viewport.snap(
          (newProps.worldWidth ? newProps.worldWidth : 100) - 50,
          (newProps.worldHeight ? newProps.worldHeight : 100)/2,
          {
            removeOnComplete: true,
            removeOnInterrupt: true
          }
        );
        viewport.fitHeight((newProps.worldHeight ? newProps.worldHeight : 100)*1.33);
      }
    }
  },
  customWillDetach: (viewport) => { return viewport; }
};

const Viewport = CustomPIXIComponent(behavior, 'Viewport');
export default Viewport;
