type CardColor = 'orange' | 'blue' | 'green' | 'purple';

const colorClasses: Record<CardColor, string> = {
    orange: "hover:bg-orange-100 border-t-orange-600",
    blue: "hover:bg-blue-100 border-t-blue-600",
    green: "hover:bg-green-100 border-t-green-600",
    purple: "hover:bg-purple-100 border-t-purple-600",
};

interface CardProps {
    color: CardColor;
    titulo: string;
    mensaje: string;
}

const Card: React.FC<CardProps> = ({ color, titulo, mensaje }) => {
    const selectedColorClasses = colorClasses[color];

    return (
        <div className={`max-w-90 border-t-8 border-gray-200 p-7 rounded-lg transition-colors bg-white w-full ${selectedColorClasses}`}>
            <h3 className="font-bold text-gray-800 mb-2 text-xl">{titulo}</h3>
            <p className="text-base text-gray-600 font-medium">{mensaje}</p>
        </div>
    );
};

export default Card;
