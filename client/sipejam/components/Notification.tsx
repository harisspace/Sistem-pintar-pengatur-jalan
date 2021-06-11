import { motion } from "framer-motion";

interface Props {
  message: string;
}

export const Notification: React.FC<Props> = ({ message }) => {
  return (
    <motion.div
      initial={{ x: 100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="w-80 bg-green-400 py-3 px-4 shadow-xl rounded-md absolute bottom-5 right-5"
    >
      <div>
        <span>SIPEJAM</span>
      </div>
      <div>
        <span>{message}</span>
      </div>
    </motion.div>
  );
};
