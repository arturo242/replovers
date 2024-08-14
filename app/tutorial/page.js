
import Nav from '../nav';
import Image from 'next/image';

export default function Tutorial() {
    return (
        <>
            <Nav site="tutorial" />
            <div className='flex flex-col gap-5 items-center w-5/6 md:w-3/6 mx-auto'>
                <h1 className='title text-center'>Tutorial</h1>

                <div id="youtube" className='flex flex-col justify-center items-center md:flex-row gap-10 mt-20 p-5 hidden'>
                    <div>
                        <iframe className='mb-3 rounded-lg' width="600" height="337" src="https://www.youtube.com/embed/8whqWrTpJfQ?si=ClUkqdiuEoyqWXd5" allow="presentation; fullscreen; accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
                        <h3 className='text-center'>Tutorial comprar productos</h3>
                    </div>
                    <div>
                        <iframe className='mb-3 rounded-lg' width="600" height="337" src="https://www.youtube.com/embed/60Enij0eRmU?si=tkrmyb0KpFngUn0-" allow="presentation; fullscreen; accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
                        <h3 className='text-center'>Tutorial enviar y declarar</h3>
                    </div>
                </div>

                <h2 className='text-secondary mt-5'>¿Qué es CNFans?</h2>
                <p>
                    Es una compañía que actúa como un intermediario que gestiona tus compras en China.
                    Cuando adquieres un producto lo estás comprando a un proveedor y CNFans se encarga
                    de enviarte esos productos a casa correctamente, lo que hace que tu compra sea más
                    segura.
                </p>
                <h2 className='text-secondary mt-5'>1 - Registro</h2>
                <p>
                    Puedes crear tu cuenta registrándote desde la página web o descargando la aplicación
                    móvil. Si te registras desde este <a href="https://cnfans.com/es/register/?ref=507768" className='text-secondary hover:text-white' target='blank'>enlace</a> podrás conseguir 129$ en cupones de descuento,
                    que posteriormente podrás utilizar para descontar precio de tu envío.
                </p>
                <p>
                    Además te dejamos este regalo, y es que si pones el código <span className='text-secondary'>ANDALUFINDS</span> en este apartado
                    podrás optar a otros cupones de descuento exclusivos.
                </p>
                <a className='boton shadowHover' href='https://cnfans.com/es/register/?ref=507768' target='blank'>Registro $129 descuento</a>
                <Image className='rounded-xl' src='/tutorial/foto-1.png' alt='foto1' width={800} height={600} />

                <h2 className='text-secondary mt-5'>2 - Añadir productos</h2>
                <p>
                    Para buscar productos puedes buscarlos en nuestra página web, Telegram o en alguna de
                    nuestras Spreadsheet.
                </p>
                <div className='flex gap-5 flex-col md:flex-row md:items-center'>
                    <a className='boton shadowHover' href="/products">Productos</a>
                    <a className='boton shadowHover' href="https://docs.google.com/spreadsheets/d/1QxgInjnAmNm2lm30G0qNZttNipC1OWPQ0crbUDkZk1A/edit?gid=0#gid=0" target='blank'>Outfits Spreadsheet</a>
                    <a className='boton shadowHover' href="https://www.youtube.com/redirect?event=video_description&redir_token=QUFFLUhqbjQ4allpam5ma2lybjVwYllUOFdqOF9HRUo1UXxBQ3Jtc0ttUzJsVTRzV1pJOElFMi1zVGs5b2x2OXBGaTd5RjlxaGJ6ZHJ5c3ZPbnY4ajk1T0VmZlNzQW81bGdIY19IS0U2a21ZQ1dpYnJKWlBUWE94emRzMGVTUVVZVUtoTVdWM1J6NThyUk1xdFc2a2FsTEVOWQ&q=https%3A%2F%2Fdocs.google.com%2Fspreadsheets%2Fd%2F1d8d3BLMxaUomRufs6aWnssNY5RWEXPl5kbUO-8Be-5Y%2Fedit%3Fusp%3Dsharing&v=p1fNMuhKXH4" target='blank'>
                        Spreadsheet (+3000)
                    </a>
                    <a className='botonSecundario shadowHoverWhite' href="https://t.me/+Lnp-Bi7rJzw1MGZk" target='blank'>Telegram</a>
                </div>
                <p>
                    Una vez que hayas encontrado los productos, debes añadirlos a la cesta. Para ello debes
                    elegir las características; talla, color o modelo. Una vez tengas todo seleccionado, añades el
                    artículo al carrito. Para añadir dorsales en camisetas de fútbol o especificar algo que queráis
                    sobre un producto, debéis añadir en las notas un mensaje.
                </p>
                <p>
                    No os debéis fijar en las fotos de los artículos, sí debéis hacerlo para ver que modelo y color
                    elegís, pero las fotos que salen son de demostración, así no será el artículo que recibiréis.

                    Me refiero a cuando vienen sin logo o sin marcas, el producto seguirá siendo el mismo, pero
                    las fotos reales las veréis cuando llegue el producto al almacén.
                </p>
                <p>
                    Para el tallaje, tenéis un apartado dedicado a las tallas de cada producto, donde vienen las
                    medidas estimadas según peso y altura.
                </p>
                <Image className='rounded-xl' src='/tutorial/foto-2.png' alt='foto2' width={800} height={600} />

                <h2 className='text-secondary mt-5'>3- Pago de los productos</h2>
                <p>
                    Una vez hayáis añadido todos los productos a la cesta, debéis dirigiros al apartado de
                    “Carro” de vuestra cuenta, y ahí debéis de realizar el primer pago. Primero se pagan los
                    productos, y después cuando todos los productos lleguen al almacén se realiza otro pago
                    para el envío.
                </p>
                <p>
                    Debéis colocar el país de destino, y darle a proceder al checkout. En la siguiente ventana
                    podéis elegir el método de pago que queréis usar. Son todos seguros así que no debéis
                    tener ningún miedo a la hora de pagar. Una vez pagues, os tocará esperar un periodo de
                    entre 1-10 días para que los productos lleguen al almacén.
                </p>
                <Image className='rounded-xl' src='/tutorial/foto-3.jpg' alt='foto3' width={800} height={600} />

                <h2 className='text-secondary mt-5'>4 - QC Fotos</h2>
                <p>
                    Una vez los productos lleguen al almacén recibirás un correo electrónico donde se os
                    informará de ello. Debéis de ir al apartado “Depósito”, y ahí encontraréis todos los productos
                    almacenados. Algunos productos tardan más que otros, así que debéis ser pacientes.
                </p>
                <p>
                    Los productos podrán estar 90 días almacenados en el warehouse, tendréis ese periodo de
                    tiempo para enviarlos cuando queráis. Podéis ver varias fotografías reales de vuestro
                    producto y el peso estimado, en caso de que no os guste, o el producto no sea lo que
                    esperabais, podéis devolverlo contactando con en soporte de la página.
                </p>

                <Image className='rounded-xl' src='/tutorial/foto-4.jpg' alt='foto4' width={800} height={600} />

                <h2 className='text-secondary mt-5'>5 - Envío</h2>
                <p>
                    Una vez llegan los productos al almacén es la hora de hacer el envío. Para ello
                    seleccionamos todos los productos que queremos enviar y le damos a proceder al envío.
                    Aquí podremos elegir quitar las cajas, añadir alguna protección extra a nuestro paquete o
                    indicar cualquier cosa que queramos al equipo de CNFans.
                </p>
                <p>
                    Para este apartado recomiendo que os veáis el vídeo de YouTube donde explico más
                    detalladamente qué líneas de envío elegir y todas las funciones que se nos presentan a la
                    hora de querer enviar nuestro paquete.
                </p>

                <Image className='rounded-xl' src='/tutorial/foto-5.jpg' alt='foto5' width={800} height={600} />

                <h2 className='text-secondary mt-5'>6 - Pesaje del paquete</h2>
                <p>
                    Una vez que selecciones la línea de envío tu paquete será mandado a pesar. Tarda 1-2 días
                    laborables en pesarse, una vez hecho, te enviarán una foto de tu paquete y del peso exacto
                    del mismo, y ahí deberás pagar el envío.
                </p>
                <p>
                    El precio del envío puede variar según la línea de envío que elijas, peso del paquete y
                    volumen.
                </p>

                <h2 className='text-secondary mt-5'>7 - Recibimiento del paquete</h2>
                <p>
                    Una vez realizado el proceso anterior y pagado la tasa de envío, te tocará esperar a que tu
                    paquete llegue a casa. El tiempo aproximado de entrega suele variar, pero normalmente
                    suele ser entre 10-20 días, dependiendo de donde vivas.
                </p>
                <p>Si quieres ver por donde va tu paquete y poder trackearlo, te recomiendo esta página.</p>
                <a className='boton shadowHover' href="https://www.ordertracker.com/es" target='blank'>Trackea tu paquete aquí</a>
                <h2 className='text-secondary mt-5'>Pérdida o Confiscación Aduanera</h2>
                <p>
                    No debes temer si tu paquete se pierde o lo confiscan en aduanas, ya que si has utilizado
                    una línea de envío que tiene seguro, todo esto se cubre al 100%, con lo que recuperarás tu
                    dinero. Es muy improbable que esto pase, por no decir que es prácticamente imposible,
                    aunque siempre cabe una pequeña posibilidad si no has realizado todos los pasos
                    correctamente. Por eso te recomiendo que veas el video tutorial de YouTube
                </p>
            </div>
        </>
    );
}
