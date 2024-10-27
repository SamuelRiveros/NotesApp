export function Home() {
    return(
        <main>
            <div className="w-100 h-[20%] p-5 flex justify-between items-center">
                <h1 className="text-5xl text-white">Notes</h1>

                <div className="flex gap-3">
                    <button className="bg-[#3B3B3B] p-3 w-[50px] w-[50px] rounded-lg"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#fff" d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"/></svg></button>
                    <button className="bg-[#3B3B3B] p-3 w-[50px] w-[50px] rounded-lg"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#fff" d="M11 17h2v-6h-2zm1-8q.425 0 .713-.288T13 8t-.288-.712T12 7t-.712.288T11 8t.288.713T12 9m0 13q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"/></svg></button>
                </div>
            </div>

            <div className="mainpic flex flex-col items-center pt-[150px] gap-3">
                <img src="./mainpic.png"/>
                <p className="text-white">Create your first Note !</p>

            </div>

            <button className="absolute bottom-0 right-0 p-5">

                <div className="bg-[#3B3B3B] flex items-center justify-center h-20 w-20 rounded-full shadow-xl"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#fff" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"/></svg></div>
                
            </button>
        </main>
    )
}