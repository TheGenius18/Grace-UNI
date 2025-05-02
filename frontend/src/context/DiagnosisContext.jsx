import { createContext, useState, useContext } from 'react';

export const DiagnosisContext = createContext();

const DiagnosisProvider = (props) => {
    const [conversation, setConversation] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [diagnosisResult, setDiagnosisResult] = useState(null);
    const [hasStarted, setHasStarted] = useState(false);

    // const sendMessage = async (message) => {
    //     setConversation(prev => [...prev, { sender: 'user', text: message }]);
    //     setIsLoading(true);
        
    //     try {
    //         const response = await fetch('/api/diagnosis/chat', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ message }),
    //         });
            
    //         const data = await response.json();
            
    //         setConversation(prev => [...prev, { sender: 'bot', text: data.response }]);
            
    //         if (data.is_final) {
    //             setDiagnosisResult({
    //                 summary: data.summary,
    //                 recommendations: data.recommendations || []
    //             });
    //         }
    //     } catch (error) {
    //         console.error('Error sending message:', error);
    //         setConversation(prev => [...prev, { 
    //             sender: 'bot', 
    //             text: 'Sorry, I encountered an error. Please try again later.' 
    //         }]);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    const startConversation = () => {
        // sendMessage('start diagnosis');
        // setHasStarted(true);
        console.log("hi")
    };

    const resetConversation = () => {
        setConversation([]);
        setDiagnosisResult(null);
        setHasStarted(false);
    };

    return (
        <DiagnosisContext.Provider value={{
            conversation,
            // sendMessage,
            isLoading,
            diagnosisResult,
            hasStarted,
            startConversation,
            resetConversation
        }}>
            {props.children}
        </DiagnosisContext.Provider>
    );
};
export default DiagnosisProvider

// export const useDiagnosisContext = () => useContext(DiagnosisContext);