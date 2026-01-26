import { Card } from "@/components/ui/card";

// 动画展示组件
const AnimationShowcase = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* 轻柔漂浮 */}
      <Card className="p-6 subtle-shadow">
        <div className="float-gentle">
          <div 
            className="w-16 h-16 rounded-lg mx-auto mb-4"
            style={{ backgroundColor: 'var(--accent-blue)' }}
          ></div>
        </div>
        <h3 className="text-xl font-semibold text-center mb-2">Float Gentle</h3>
        <p className="text-muted-foreground text-center">Плавное покачивание вверх-вниз</p>
      </Card>

      {/* 向左漂移 */}
      <Card className="p-6 subtle-shadow">
        <div className="drift-left">
          <div 
            className="w-16 h-16 rounded-lg mx-auto mb-4"
            style={{ backgroundColor: 'var(--accent-emerald)' }}
          ></div>
        </div>
        <h3 className="text-xl font-semibold text-center mb-2">Drift Left</h3>
        <p className="text-muted-foreground text-center">Медленное движение влево-вправо</p>
      </Card>

      {/* 向右漂移 */}
      <Card className="p-6 subtle-shadow">
        <div className="drift-right">
          <div 
            className="w-16 h-16 rounded-lg mx-auto mb-4"
            style={{ backgroundColor: 'var(--accent-purple)' }}
          ></div>
        </div>
        <h3 className="text-xl font-semibold text-center mb-2">Drift Right</h3>
        <p className="text-muted-foreground text-center">Плавное колебание вправо-влево</p>
      </Card>

      {/* 照片摇摆 1 */}
      <Card className="p-6 subtle-shadow">
        <div className="photo-sway-1">
          <div 
            className="w-16 h-20 rounded-lg mx-auto mb-4"
            style={{ backgroundColor: 'var(--accent-blue)' }}
          ></div>
        </div>
        <h3 className="text-xl font-semibold text-center mb-2">Photo Sway</h3>
        <p className="text-muted-foreground text-center">Имитация покачивания фото</p>
      </Card>

      {/* 脉冲光晕 */}
      <Card className="p-6 subtle-shadow">
        <div className="pulse-glow">
          <div 
            className="w-16 h-16 rounded-full mx-auto mb-4"
            style={{ backgroundColor: 'var(--accent-emerald)' }}
          ></div>
        </div>
        <h3 className="text-xl font-semibold text-center mb-2">Pulse Glow</h3>
        <p className="text-muted-foreground text-center">Пульсирующее свечение</p>
      </Card>

      {/* 轻柔动画 */}
      <Card className="p-6 subtle-shadow gentle-animation hover:elevated-shadow">
        <div 
          className="w-16 h-16 rounded-lg mx-auto mb-4"
          style={{ backgroundColor: 'var(--accent-purple)' }}
        ></div>
        <h3 className="text-xl font-semibold text-center mb-2">Gentle Hover</h3>
        <p className="text-muted-foreground text-center">Плавный переход при наведении</p>
      </Card>
    </div>
  );
};

export default AnimationShowcase;