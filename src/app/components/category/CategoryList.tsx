import { Type } from '@/src/app/types/pokemon';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface ColorStyle {
  bg: string;
  text: string;
}

interface CategoryListProps {
  types: Type[];
  zipraColors: ColorStyle[];
}

export const CategoryList: React.FC<CategoryListProps> = ({ types, zipraColors }) => {
  const router = useRouter();

  return (
    <div className="grid grid-cols-3 gap-4">
      {types.map((type: Type, index: number) => {
        const color = zipraColors[index % zipraColors.length];
        return (
          <motion.div
            key={type.name}
            className={`card card-bordered my-2 ${color.bg} cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 hover:bg-opacity-85`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => router.push(`/pokemon/category/${type.name}`)}
          >
            <div className="card-body">
              <h4 className={`card-title ${color.text}`}>{type.name}</h4>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};