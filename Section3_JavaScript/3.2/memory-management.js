const DataVisualization = ({ dataUrl }) => {
  const [data, setData] = useState([]);
  const chartRef = useRef();
  const chartInstance = useRef(null); 
  const eventSourceRef = useRef(null);

  const handleVisibilityChange = useCallback(() => {
  }, []);

  useEffect(() => {
    eventSourceRef.current = new EventSource(dataUrl);
    const interval = setInterval(() => {
      fetchAnalytics().then(setData);
    }, 5000);
    
    chartInstance.current = new Chart(chartRef.current, {
      type: 'line',
      data: { datasets: [] }
    });
    
    const handleMessage = (event) => {
      const newData = JSON.parse(event.data);
      chartInstance.current.data.datasets.push(newData);
      chartInstance.current.update();
    };
    
    eventSourceRef.current.onmessage = handleMessage;
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      clearInterval(interval);
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [dataUrl, handleVisibilityChange]);
  
  return <canvas ref={chartRef} />;
};