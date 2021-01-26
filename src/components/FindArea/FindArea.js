export function FindArea(props) {
    let cleanedData = []
    cleanedData = props.playersMarkers.flatMap(element => [element.lat, element.lng])
    
    function findArea(polygon){
      const length = polygon.length;
    
      let sum = 0;
    
      for(let i = 0; i < length; i += 2){
        sum += polygon[i    ] * polygon[(i + 3) % length]
             - polygon[i + 1] * polygon[(i + 2) % length];
      }
    
      return Math.abs(sum) * 0.5;
    }
    const score = Math.round(findArea(cleanedData) * 1000000);

    return (
        <div>
            <p>{props.username}</p>
            <p>Score: {score} points</p>
        </div>
    )

} 