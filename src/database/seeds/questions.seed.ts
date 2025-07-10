import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { OpenQuestion } from '../schemas/openequestion.schema'
import { Theme } from '../schemas/theme'
import { MultipleChoiceQuestion } from '../schemas/mcquestion'

dotenv.config()

const MONGO_URI = process.env.MONGO_URI || ''

const themeAdministracionEficiente = {
	open: [
		{
			question: "¿Qué ventajas tiene involucrar al equipo de trabajo en la planeación y el control del proyecto?",
			answer: "Se enriquece el proceso y aumenta el compromiso del equipo hacia el proyecto.",
			theme: ""
		},
		{
			question: "¿Por qué es importante invertir tiempo en el cierre del proyecto?",
			answer: "Para reflexionar, identificar buenas prácticas, errores y documentar lecciones.",
			theme: ""
		},
		{
			question: "¿Qué implica escatimar en las actividades iniciales de un proyecto?",
			answer: "Rehacer análisis y diseño después, con un costo entre 10 y 100 veces mayor.",
			theme: ""
		},
		{
			question: "¿Qué ocurre cuando se abandona la planificación ante los problemas?",
			answer: "El equipo cae en improvisaciones que reducen la calidad y aumentan el caos.",
			theme: ""
		},
		{
			question: "¿Qué se debe hacer si la planificación original falla?",
			answer: "Contar con un plan alternativo.",
			theme: ""
		},
		{
			question: "¿Qué importancia tiene la prevención de problemas en gestión de proyectos?",
			answer: "Permite anticipar y reducir el impacto de riesgos potenciales antes de que afecten al proyecto.",
			theme: ""
		},
		{
			question: "¿Qué relación existe entre el tiempo invertido en planeación y el éxito del proyecto?",
			answer: "Una buena planeación reduce riesgos, evita retrabajos y mejora el cumplimiento de plazos y costos.",
			theme: ""
		},
		{
			question: "¿En cuántas partes se divide comúnmente un proyecto para tener un nivel razonable de detalle?",
			answer: "Se divide en 4, 5 o 6 partes grandes (fases, etapas o partidas) que luego se subdividen hasta llegar a las actividades o tareas.",
			theme: ""
		},
		{
			question: "¿Qué consecuencias pueden tener las fallas de los contratados en un proyecto?",
			answer: "Pueden entregar con baja calidad, tarde o fuera de especificaciones, lo cual afecta el avance del proyecto.",
			theme: ""
		},
		{
			question: "¿Qué significa “fragmentar el proyecto” y por qué es útil?",
			answer: "Es dividirlo en partes manejables y tareas específicas, lo que facilita la planificación y el control.",
			theme: ""
		},
		{
			question: "¿Cómo contribuyen las lecciones aprendidas al éxito futuro?",
			answer: "Permiten mejorar continuamente, replicar lo exitoso y evitar errores anteriores.",
			theme: ""
		},
		{
			question: "¿Cuál es el propósito de monitorear el avance real del proyecto?",
			answer: "Detectar desviaciones y aplicar medidas correctivas a tiempo.",
			theme: ""
		},
		{
			question: "¿Qué ocurre si no se documentan bien los objetivos y restricciones del proyecto?",
			answer: "Hay riesgo de malentendidos y falta de dirección clara.",
			theme: ""
		},
		{
			question: "¿Por qué es riesgosa una gestión de riesgos insuficiente?",
			answer: "Porque un solo riesgo no previsto puede provocar grandes retrasos.",
			theme: ""
		},
		{
			question: "¿En qué consiste el error de “pretender ponerse al día más adelante”?",
			answer: "No reestimar el proyecto tras cambios, manteniendo un plan desactualizado e incumplible.",
			theme: ""
		},
		{
			question: "¿Qué precauciones deben tomarse con las estimaciones de tiempo y costo?",
			answer: "Validarlas porque suelen ser irreales, y gestionar los cambios para evitar impactos negativos.",
			theme: ""
		},
		{
			question: "¿Cómo puede el líder fomentar la cohesión del equipo de trabajo?",
			answer: "Con incentivos, reuniones presenciales y espacios comunes que promuevan el trabajo colaborativo.",
			theme: ""
		},
		{
			question: "¿Además del sistema entregado al cliente, cuál es otro producto clave al final del proyecto?",
			answer: "Las lecciones aprendidas, que proporcionan retroalimentación útil.",
			theme: ""
		},
		{
			question: "¿Por qué no se debe iniciar un proyecto sin un objetivo bien definido?",
			answer: "Porque permite alinear expectativas, evitar ambigüedades y establecer restricciones desde el inicio.",
			theme: ""
		},
		{
			question: "¿Qué pasa cuando se menosprecia el análisis de requerimientos o el diseño?",
			answer: "Se pueden malinterpretar los requerimientos y tomar malas decisiones que afecten la fiabilidad del sistema.",
			theme: ""
		},
		{
			question: "¿Qué es un diagrama de Gantt y para qué sirve?",
			answer: "Es una técnica visual que muestra la relación entre actividades, su precedencia y permite optimizar el uso de recursos.",
			theme: ""
		}
	],
	close: [
		{
			question: "¿Cuál es el riesgo de imponer un plan de trabajo sin consultar al equipo?",
			answers: [
				"Se aceleran los procesos.",
				"El equipo se siente más motivado.",
				"Se garantiza el cumplimiento del cronograma.",
				"El equipo puede mostrar resistencia y falta de compromiso."
			],
			correctAnswer: "El equipo puede mostrar resistencia y falta de compromiso.",
			theme: ""
		},
		{
			question: "¿Cuál es uno de los principales beneficios de usar una metodología estándar en todos los proyectos?",
			answers: [
				"Reduce la participación del equipo.",
				"Aumenta la burocracia.",
				"Mejora la consistencia y el desempeño general de los proyectos.",
				"Elimina la necesidad de documentar."
			],
			correctAnswer: "Mejora la consistencia y el desempeño general de los proyectos.",
			theme: ""
		},
		{
			question: "¿Qué problema puede causar una planificación excesivamente optimista?",
			answers: [
				"Mejora la moral del equipo.",
				"Se eliminan las tareas innecesarias.",
				"Subestimación de actividades críticas y presión innecesaria sobre los desarrolladores.",
				"Se termina el proyecto antes del tiempo estimado."
			],
			correctAnswer: "Subestimación de actividades críticas y presión innecesaria sobre los desarrolladores.",
			theme: ""
		},
		{
			question: "¿Qué se obtiene en los puntos críticos del proyecto conocidos como hitos?",
			answers: [
				"Una reducción de presupuesto.",
				"Lecciones aprendidas.",
				"Entregables como documentos de diseño o especificaciones.",
				"Fiestas de celebración."
			],
			correctAnswer: "Entregables como documentos de diseño o especificaciones.",
			theme: ""
		},
		{
			question: "¿Qué sucede cuando se recorta el tiempo destinado al control de calidad?",
			answers: [
				" Se requiere mayor esfuerzo al final del proyecto para corregir errores.",
				"El proyecto termina antes de lo previsto.",
				"Se mejora la productividad.",
				"Se ahorra tiempo sin consecuencias."
			],
			correctAnswer: " Se requiere mayor esfuerzo al final del proyecto para corregir errores.",
			theme: ""
		}
	],
}

const themeRecursosMedidas = {
	open: [
		{
			question: "¿Cuál es el objetivo de la disciplina de la Ingeniería de Requisitos?",
			answer: "Asegurar que los requisitos del sistema sean definidos y gestionados correctamente.",
			theme: ""
		},
		{
			question: "¿Cuál es una de las principales causas de errores en el software?",
			answer: "La mala definición de los requisitos.",
			theme: ""
		},
		{
			question: "¿Cuál es el propósito del análisis de requisitos?",
			answer: "Obtener una comprensión más profunda del problema para proponer una solución adecuada.",
			theme: ""
		},
		{
			question: "¿Qué define un requisito funcional?",
			answer: "Una función que el sistema debe realizar.",
			theme: ""
		},
		{
			question: "¿Qué define un requisito no funcional?",
			answer: "Restricciones sobre cómo el sistema realiza sus funciones.",
			theme: ""
		},
		{
			question: "¿Qué es la trazabilidad de requisitos?",
			answer: "La capacidad de seguir un requisito desde su origen hasta su implementación.",
			theme: ""
		},
		{
			question: "¿Qué es un caso de uso?",
			answer: "Una técnica para describir cómo los usuarios interactúan con un sistema.",
			theme: ""
		},
		{
			question: "¿Qué representa un actor en un caso de uso?",
			answer: "Una entidad externa que interactúa con el sistema.",
			theme: ""
		},
		{
			question: "¿Cuál es el objetivo de un modelo de casos de uso?",
			answer: "Mostrar las funcionalidades principales del sistema desde el punto de vista del usuario.",
			theme: ""
		},
		{
			question: "¿Qué beneficio aporta el uso de prototipos durante el análisis?",
			answer: "Permiten validar requerimientos y detectar errores tempranamente.",
			theme: ""
		}
	],
	close: [
		{
			question: "¿Qué tipo de requisito describe cómo debe comportarse el sistema bajo ciertas condiciones?",
			answers: [
				"Requisito funcional",
				"Requisito de negocio",
				"Requisito no funcional",
				"Requisito técnico"
			],
			correctAnswer: "Requisito no funcional",
			theme: ""
		},
		{
			question: "¿Cuál de los siguientes no es un beneficio directo del uso de casos de uso?",
			answers: [
				"Facilitan la validación con el usuario",
				"Permiten la implementación inmediata",
				"Ayudan a definir los límites del sistema",
				"Sirven como base para el diseño"
			],
			correctAnswer: "Permiten la implementación inmediata",
			theme: ""
		},
		{
			question: "¿Qué herramienta permite modelar visualmente los casos de uso?",
			answers: [
				"Diagrama de clases",
				"Diagrama de flujo",
				"Diagrama de casos de uso",
				"Diagrama de Gantt"
			],
			correctAnswer: "Diagrama de casos de uso",
			theme: ""
		},
		{
			question: "¿Cuál es una característica de un buen requisito?",
			answers: [
				"Ambiguo",
				"No verificable",
				"Consistente",
				"Contradictorio"
			],
			correctAnswer: "Consistente",
			theme: ""
		},
		{
			question: "¿Cuál es el propósito de un prototipo durante la etapa de análisis?",
			answers: [
				"Reducir el tiempo de programación",
				"Evaluar el rendimiento del sistema",
				"Visualizar y validar los requerimientos",
				"Diseñar la base de datos"
			],
			correctAnswer: "Visualizar y validar los requerimientos",
			theme: ""
		}
	],
}

const themeElProblema = {
	open: [
		{
			question: "Una vez que está definido el problema con todo y sus detalles, su importancia y hay una solución propuesta, ¿Cuál es el siguiente paso?",
			answer: "Someter a evaluación la solicitud del proyecto",
			theme: ""
		},
		{
			question: "Explica cuáles son los sistemas Pret-a-porter",
			answer: "Son los que ya están hechos y el cliente se adapta a lo que tienen",
			theme: ""
		},
		{
			question: "Por qué no se recomienda cambiar de herramientas a mitad del proyecto?",
			answer: "Por la curva de aprendizaje, rehacer el trabajo y los inevitables errores cometidos con una herramienta totalmente nueva",
			theme: ""
		},
		{
			question: "¿Qué problema se puede presentar cuando se confía excesivamente en las ventajas que ofrece una tecnología nueva?",
			answer: "Es probable que la nueva tecnología sí sea muy buena, sin embargo, no sea la más apropiada para el ambiente de desarrollo del proyecto en particular",
			theme: ""
		},
		{
			question: "¿Cuál es el error que se comete cuando los desarrolladores de un proyecto tienen que verificar con los demás antes de poner la última versión de cada archivo del código fuente en el directorio maestro?",
			answer: "Falta de control automático del código fuente",
			theme: ""
		},
		{
			question: "¿Qué es una carta del Proyecto?",
			answer: "Es un formato que se presenta la propuesta del proyecto ante un comité que se encargará de determinar si es viable o no llevarlo a cabo",
			theme: ""
		},
		{
			question: "A qué error corresponde: “Las nuevas técnicas implican nuevos riesgos, que sólo se descubren usándolas”",
			answer: "Sobreestimación de las ventajas del empleo de nuevas herramientas o métodos",
			theme: ""
		},
		{
			question: "Da un ejemplo de Software de Gestión",
			answer: "ERP (Planificación de Recursos Empresariales) nómina, control de almacén, contabilidad",
			theme: ""
		},
		{
			question: "Menciona 3 de los diferentes orígenes de un proyecto de software",
			answer: "Necesidad del Mercado. Necesidad de negocios. Requerimiento de un cliente o proveedor. Avances tecnológicos. Requerimiento legal",
			theme: ""
		},
		{
			question: "Da dos ejemplos de SW Pret-a-porter",
			answer: "Office, videojuegos, Acrobat",
			theme: ""
		},
		{
			question: "¿Cuáles son los principales puntos que se deben incluir al hacer la solicitud de aprobación de un proyecto de software?",
			answer: "Definición del problema.    - Detalles del problema.    - Importancia del problema.    - Solución propuesta.",
			theme: ""
		},
		{
			question: "Menciona las 3 causas por las que un proyecto de SW se termina",
			answer: "Se logran los objetivos del proyecto    - Sus objetivos no pueden ser cumplidos   - Ya no existe la necesidad que dio origen al proyecto",
			theme: ""
		},
		{
			question: "Da dos ejemplos de Software de sistemas",
			answer: "SO, controladores, compiladores, sw embebido",
			theme: ""
		},
		{
			question: "Menciona 2 de las ventajas que debe proporcionar un sistema de software",
			answer: "Mejorar la comunicación, Aumentar la capacidad (de procesamiento, de volumen de datos, de acceso a la info). Reducción o monitoreo de los costos. Control. Ventaja competitiva",
			theme: ""
		},
		{
			question: "Explica qué sucede cuando se sobreestiman las mejoras de reutilizar código de proyectos anteriores",
			answer: "El tiempo que se gana no es tan grande como se espera",
			theme: ""
		}
	],
	close: [
		{
			question: "Ventajas que debe proporcionar un sistema de software",
			answers: [
				"Aumentar la capacidad de procesamiento, de volumen de datos, de acceso a la info. y proporcionar entretenimiento",
				"Reducción o monitoreo de los costos, ventaja competitiva, control, aumento de capacidad, mejora en la comunicación",
				"Mejorar las finanzas de la empresa, las relaciones sociales y la amistad entre compañeros",
				"Reducción de costos y de empleados"
			],
			correctAnswer: "Reducción o monitoreo de los costos, ventaja competitiva, control, aumento de capacidad, mejora en la comunicación",
			theme: ""
		},
		{
			question: "Causas por las que un proyecto de SW se termina",
			answers: [
				"Se logran los objetivos del proyecto o los objetivos no se pudieron cumplir o desaparece la necesidad",
				"Se termina el presupuesto o los empleados están asignados a otros proyectos o se decide hacer un nuevo proyecto",
				"El cliente solicita cambios",
				"El administrador del proyecto cambia de opinión"
			],
			correctAnswer: "Se logran los objetivos del proyecto o los objetivos no se pudieron cumplir o desaparece la necesidad",
			theme: ""
		},
		{
			question: "Posibles orígenes de un proyecto de software",
			answers: [
				"Necesidad del Mercado, cambio del administrador del proyecto",
				"Necesidad de negocios, contratación de más personal",
				"Requerimiento de un cliente o proveedor, cambio de computadoras en la empresa",
				"Avances tecnológicos, Requerimiento legal, Necesidad de negocios"
			],
			correctAnswer: "Avances tecnológicos, Requerimiento legal, Necesidad de negocios",
			theme: ""
		},
		{
			question: "¿Cuáles son los principales puntos que se deben incluir al hacer la solicitud de aprobación de un proyecto de software?",
			answers: [
				"b.\tDetalles del problema, costos, requerimientos y tiempo de entrega",
				"c.\tImportancia del problema, requerimientos, tiempo de entrega y solución propuesta",
				"a.\tDefinición, importancia, detalles del problema y solución propuesta.",
				"d.\tSolución propuesta, costos, requerimientos, tiempo de entrega y diseño"
			],
			correctAnswer: "a.\tDefinición, importancia, detalles del problema y solución propuesta.",
			theme: ""
		},
		{
			question: "Cuando se re-usa código de proyectos anteriores",
			answers: [
				"Es seguro que aumenta la velocidad de desarrollo",
				"Se producen errores por el cambio de versión",
				"El tiempo que se gana no es tan grande como se espera"
			],
			correctAnswer: "El tiempo que se gana no es tan grande como se espera",
			theme: ""
		}
	],
}

const themeEstimacion = {
	open: [
		{
			question: "¿En qué consiste el método intuitivo?",
			answer: "Se basa en la experiencia del personal más antiguo, es rápido y fácil de aplicar, pero es bastante inexacto.",
			theme: ""
		},
		{
			question: "¿Por qué es preferible comprometerse con los servicios antes que con una fecha exacta de entrega?",
			answer: "Porque el coste y el tiempo dependen del alcance real del sistema, y resulta más fiable definir primero qué se entregará y luego ajustar el plazo según avance el proyecto.",
			theme: ""
		},
		{
			question: "¿Qué se entiende por factibilidad de un proyecto?",
			answer: "Es la posibilidad de que el proyecto resulte útil y viable para la empresa u organización, evaluada desde distintos aspectos.",
			theme: ""
		},
		{
			question: "¿En qué consiste el método de la forma estándar?",
			answer: "Se cuantifican factores que afectan al tiempo de desarrollo, se evalúan las características del personal, los detalles del sistema y la complejidad del proyecto. Se utilizan fórmulas para calcular el tiempo de desarrollo en horas, días o semanas.",
			theme: ""
		},
		{
			question: "¿Qué sucede si la estimación es demasiado alta?",
			answer: "El equipo reparte el trabajo para cubrir el tiempo disponible, lo que genera desperdicio de tiempo y recursos.",
			theme: ""
		},
		{
			question: "¿Qué ventaja aporta contratar a un grupo independiente de expertos para la estimación?",
			answer: "Elimina sesgos de interés (como apresurar la entrega) y garantiza una valoración objetiva de tiempo y recursos.",
			theme: ""
		},
		{
			question: "¿Qué tareas deben estar definidas para poder abordar un proyecto?",
			answer: "Las tareas que dependen de la realización de otras. Las tareas que se pueden hacer en paralelo.",
			theme: ""
		},
		{
			question: "¿Qué características comparten los proyectos que se desarrollan a tiempo?",
			answer: "Buena estimación de los requerimientos de tiempo. Un mecanismo para monitorear el avance. o\tUn medio para comparar desempeño planeado con el real. Información suficiente para afrontar problemas cuando surjan.",
			theme: ""
		},
		{
			question: "¿Qué aspectos de recursos, presupuesto y aprobación es necesario establecer al inicio de un proyecto?",
			answer: "El número de personas que se requerirá para llevarlo a cabo.     El presupuesto y la identificación de costos.     Las fechas límite.     Las personas que aprobarán el presupuesto.",
			theme: ""
		},
		{
			question: "¿Cuáles son los tres métodos más comunes para estimar el tiempo de desarrollo?",
			answer: "Histórico, intuitivo y el método de la forma estándar. Método histórico: Basado en registros detallados de proyectos anteriores. Método intuitivo: Basado en la experiencia subjetiva del personal.  Método de la forma estándar: Basado en fórmulas que cuantifican factores de personal, sistema y complejidad.",
			theme: ""
		},
		{
			question: "¿En qué se debe concentrar el equipo durante las negociaciones?",
			answer: "En lo que se puede entregar realmente, presentando soluciones y opciones viables, y evitando discusiones sobre aspectos inalcanzables.",
			theme: ""
		},
		{
			question: "¿Qué consecuencias tiene una estimación demasiado baja?",
			answer: "Provoca retrasos en la entrega y un costo mayor al esperado, ya que no se han contado adecuadamente las actividades críticas.",
			theme: ""
		},
		{
			question: "¿En qué consiste la factibilidad financiera?",
			answer: "Compara los beneficios financieros del nuevo sistema con los costos de desarrollo, implantación y con el costo de no llevar a cabo el proyecto.",
			theme: ""
		},
		{
			question: "¿Cómo ayuda el entregar el producto por etapas (por ejemplo, versiones 0.7, 0.8…)?",
			answer: "Permite priorizar las funciones más importantes al principio, obtener retroalimentación temprana y reducir riesgos al implementar progresivamente las demás características.",
			theme: ""
		},
		{
			question: "¿Quiénes deben preparar la estimación y por qué?",
			answer: "Debe elaborarla una persona o equipo calificado en construcción de software, para asegurar realismo y rigor técnico, evitando estimaciones infundadas por parte del cliente.",
			theme: ""
		},
		{
			question: "¿Qué debe hacerse cuando cambian los requerimientos tras la estimación inicial?",
			answer: "Volver a estimar el tiempo de entrega y negociar de nuevo, manteniendo la firmeza en que un plazo más corto sin ajustar recursos o alcance llevará inevitablemente a retrasos.",
			theme: ""
		},
		{
			question: "¿Por qué es necesario negociar con el cliente durante la estimación inicial?",
			answer: "Porque sirve para ajustar conjuntamente el alcance, el tiempo y el presupuesto, evitando malentendidos y definiendo desde el inicio qué es factible y qué no.",
			theme: ""
		},
		{
			question: "¿Qué aspectos cubre la factibilidad técnica?",
			answer: "Determina si se dispone de la tecnología y la capacidad de equipo necesarias, así como posibilidades de expansión y garantías de exactitud, confiabilidad, accesibilidad y seguridad de datos.",
			theme: ""
		},
		{
			question: "¿Qué plantea la factibilidad operacional?",
			answer: "Valora si el sistema será aceptado y utilizado por los usuarios y si existe resistencia al cambio hacia una nueva herramienta.",
			theme: ""
		},
		{
			question: "Qué es la estimación de un proyecto?",
			answer: "La estimación de un proyecto consiste en definir aproximadamente en cuánto tiempo se llevará a cabo, cuántas personas se necesitarán y cuál será su costo total.",
			theme: ""
		},
		{
			question: "¿En qué consiste el método de estimación histórico?",
			answer: "Utiliza registros de proyectos anteriores, solo es útil cuando el proyecto a desarrollar es similar al anterior.",
			theme: ""
		},
		{
			question: "¿En qué consiste la propuesta de “pasar servicios deseados a la versión 2”?",
			answer: "Diferir algunas funcionalidades no críticas para una segunda versión, de modo que la entrega inicial incluya solo lo esencial y cumpla plazos sin sacrificar calidad.",
			theme: ""
		},
		{
			question: "Nombra dos estrategias para reducir el alcance sin eliminar completamente un servicio.",
			answer: "•“Pulir menos” la funcionalidad: implementarla hasta un nivel funcional, pero sin detalles estéticos o de optimización completa.      •\tRelajar requisitos detallados: usar componentes comerciales preconstruidos en lugar de desarrollar soluciones a medida.",
			theme: ""
		},
		{
			question: "Menciona dos opciones que se pueden ofrecer al cliente para ajustar tiempo y alcance.",
			answer: "Entregar un mes más tarde con todos los servicios solicitados. Mantener la fecha deseada si se elimina algún servicio o se incorpora más personal (con coste adicional).",
			theme: ""
		}
	],
	close: [
		{
			question: "Características de los proyectos que se desarrollan a tiempo:",
			answers: [
				"Un administrador que trata bien a todos, información suficiente para afrontar problemas cuando surjan, buen monitoreo, suficiente dinero.",
				"Información suficiente para afrontar problemas cuando surjan, dinero suficiente, buen monitoreo, requerimientos muy estables.",
				"Buena estimación del tiempo, buen monitoreo, comparación del desempeño planeado con el real, información suficiente para afrontar problemas cuando surjan.",
				"Requerimientos muy estables, información suficiente para afrontar problemas cuando surjan, suficientes recursos, cliente dispuesto a ayudar."
			],
			correctAnswer: "Buena estimación del tiempo, buen monitoreo, comparación del desempeño planeado con el real, información suficiente para afrontar problemas cuando surjan.",
			theme: ""
		},
		{
			question: "¿Cuáles son los tres métodos más comunes para estimar el tiempo de desarrollo?",
			answers: [
				"Histórico, básico, formal",
				"Histórico, básico, intuitivo",
				"Histórico, intuitivo y estándar"
			],
			correctAnswer: "Histórico, intuitivo y estándar",
			theme: ""
		}
	],
}

const themeMetodosComunicacion = {
	open: [
    {
        "question": "¿Qué métodos existen para crear prototipos de interfaces de usuario?",
        "answer": "Enfoque dirigido por secuencias y comandos, lenguajes de programación visuales, y prototipado basado en internet.",
        "theme": ""
    },
    {
        "question": "¿Qué son los métodos de comunicación o técnicas de recogida de información?",
        "answer": "Son procesos mediante los cuales se consigue que los usuarios descubran los requerimientos que desean en la aplicación.",
        "theme": ""
    },
    {
        "question": "¿Qué ventajas ofrecen los prototipos en papel?",
        "answer": "Son económicos, efectivos y no requieren software ejecutable o estándares profesionales.",
        "theme": ""
    },
    {
        "question": "¿Cuál es el objetivo principal de los prototipos de interfaz de usuario?",
        "answer": "Permitir a los usuarios tener una experiencia directa con la interfaz y definir claramente sus preferencias y necesidades.",
        "theme": ""
    },
    {
        "question": "¿Por qué suelen fallar los prototipos?",
        "answer": "Porque no se entiende qué es un prototipo, no se sabe cuándo dejar de refinarlo, o se cree erróneamente que es un producto final.",
        "theme": ""
    },
    {
        "question": "¿Cuáles son los pasos para construir un prototipo?",
        "answer": "Evaluar petición del software, desarrollar representación abreviada, crear especificaciones de diseño abreviadas, construir software, probar y refinar con el cliente, repetir hasta formalizar requerimientos.",
        "theme": ""
    },
    {
        "question": "¿Qué es un prototipo de requerimientos?",
        "answer": "Prototipo que permite al usuario percibir la funcionalidad final mediante el diseño de interfaces o pantallas.",
        "theme": ""
    },
    {
        "question": "¿Qué es la evaluación de interfaces de usuario?",
        "answer": "Proceso para evaluar cómo se utiliza una interfaz y verificar si cumple los requerimientos del usuario.",
        "theme": ""
    },
    {
        "question": "¿Cuáles son los cuatro pasos principales en el análisis de técnicas de recogida de información?",
        "answer": "Identificar fuentes de información, realizar preguntas apropiadas, analizar información recogida y confirmar requerimientos con usuarios.",
        "theme": ""
    },
    {
        "question": "¿Qué diferencia al prototipo evolutivo del prototipo desechable?",
        "answer": "El evolutivo puede convertirse en parte del producto final, mientras que el desechable se crea para explorar soluciones y luego se descarta.",
        "theme": ""
    },
    {
        "question": "¿Qué ventajas tiene JAD sobre las entrevistas tradicionales?",
        "answer": "Ahorra tiempo al evitar contrastar opiniones individualmente y reduce errores al revisar en equipo.",
        "theme": ""
    },
    {
        "question": "¿En qué consiste el Desarrollo Conjunto de Aplicaciones (JAD)?",
        "answer": "Es una práctica grupal, alternativa a las entrevistas, donde participan usuarios, analistas y administradores para definir los requerimientos del sistema.",
        "theme": ""
    },
    {
        "question": "¿Qué es un prototipo en desarrollo de software?",
        "answer": "Una versión preliminar e intencionalmente incompleta de un sistema utilizada para entender y definir mejor los requerimientos y diseño del sistema.",
        "theme": ""
    },
    {
        "question": "Menciona dos propósitos principales del prototipo.",
        "answer": "Obtener rápidamente información para toma de decisiones y ayudar a comprender requerimientos para decidir el diseño definitivo.",
        "theme": ""
    },
    {
        "question": "¿Qué principios fundamentales tiene el método JAD?",
        "answer": "Dinámica de grupo, ayudas visuales, proceso organizado y filosofía WYSIWYG (lo que ves es lo que obtienes).",
        "theme": ""
    },
    {
        "question": "¿Cuándo tienen éxito los prototipos?",
        "answer": "Cuando está claro el propósito del prototipo, se comprende la tecnología, se involucra a los usuarios a tiempo y hay disposición a repetirlo.",
        "theme": ""
    }
	],
	close: [
    {
        "question": "En el Desarrollo Conjunto de Aplicaciones (JAD) participan:",
        "answers": [
            "Los analistas y los desarrolladores",
            "Sólo los clientes",
            "Los analistas y los clientes",
            "Analistas, desarrolladores y testers"
        ],
        "correctAnswer": "Los analistas y los clientes",
        "theme": ""
    },
    {
        "question": "Son técnicas sencillas para evaluar interfaces:",
        "answers": [
            "Observación indirecta y entrevistas.",
            "Formularios, inclusión de código para seguimiento y entrevistas.",
            "Cuestionarios, inclusión de código para seguimiento, grabaciones en video, y observación directa de usuarios pensando en voz alta.",
            "fotografías, entrevistas y observación directa de usuarios pensando en voz alta."
        ],
        "correctAnswer": "Cuestionarios, inclusión de código para seguimiento, grabaciones en video, y observación directa de usuarios pensando en voz alta.",
        "theme": ""
    },
    {
        "question": "Menciona tres atributos clave para evaluar la usabilidad de una interfaz.",
        "answers": [
            "Aprendizaje, robustez y recuperación.",
            "Robustez, aceleración y presentación",
            "Implementación, recuperación y aprendizaje.",
            "Robustez, colores y presentación."
        ],
        "correctAnswer": "Aprendizaje, robustez y recuperación.",
        "theme": ""
    },
    {
        "question": "¿Cuáles son las fases del método JAD?",
        "answers": [
            "Diseño, Sesión JAD y codificación.",
            "Adaptación y preparación.",
            "Adaptación, sesión JAD, e implementación.",
            "Adaptación o preparación, sesión JAD, y documentación."
        ],
        "correctAnswer": "Adaptación o preparación, sesión JAD, y documentación.",
        "theme": ""
    },
    {
        "question": "Menciona tres técnicas principales de recogida de información.",
        "answers": [
            "Entrevistas, prototipado, observación.",
            "Prototipado, canalización, lectura.",
            "Entrevistas, experimentación, canalización",
            "Observación, lectura, prototipado."
        ],
        "correctAnswer": "Entrevistas, prototipado, observación.",
        "theme": ""
    }
	]
}

async function connectDB() {
	console.log('INTENTANTO CONECTAR A LA DB: ', MONGO_URI)
	await mongoose.connect(MONGO_URI)
	console.log('DB CONECTADA')
}

async function seed() {
	await OpenQuestion.deleteMany()
	await OpenQuestion.deleteMany()

	const administracioneficienteTheme = await Theme.findOne({ name: 'Clase 8: Administración Eficiente y Errores del Proceso' })
	const recursosMedidasTheme = await Theme.findOne({ name: 'Recursos, medidas, métricas e indicadores' })
	const elProblemaTheme = await Theme.findOne({ name: 'Clase 4: "El Problema"' })
	const estimacionTheme = await Theme.findOne({ name: 'Clase 10: Estimación' })
	const metodosTheme = await Theme.findOne({ name: 'Métodos de comunicación' })

	const themeAdministracionEficienteOpenWithIds = themeAdministracionEficiente.open.map(question => ({
		...question,
		theme: administracioneficienteTheme?._id
	}))

	const themeAdministracionEficienteCloseWithIds = themeAdministracionEficiente.close.map(question => ({
		...question,
		theme: administracioneficienteTheme?._id
	}))

	const themeRecursosMedidasOpenWithIds = themeRecursosMedidas.open.map(question => ({
		...question,
		theme: recursosMedidasTheme?._id
	}))

	const themeRecursosMedidasCloseWithIds = themeRecursosMedidas.close.map(question => ({
		...question,
		theme: recursosMedidasTheme?._id
	}))

	const themeElProblemaOpenWithIds = themeElProblema.open.map(question => ({
		...question,
		theme: elProblemaTheme?._id
	}))

	const themeElProblemaCloseWithIds = themeElProblema.close.map(question => ({
		...question,
		theme: elProblemaTheme?._id
	}))

	const themeEstimacionOpenWithIds = themeEstimacion.open.map(question => ({
		...question,
		theme: estimacionTheme?._id
	}))

	const themeEstimacionCloseWithIds = themeEstimacion.close.map(question => ({
		...question,
		theme: estimacionTheme?._id
	}))

	const themeMetodosComunicacionOpenWithIds = themeMetodosComunicacion.open.map(question => ({
		...question,
		theme: metodosTheme?._id
	}))

	const themeMetodosComunicacionCloseWithIds = themeMetodosComunicacion.close.map(question => ({
		...question,
		theme: metodosTheme?._id
	}))

	await OpenQuestion.insertMany([ ...themeAdministracionEficienteOpenWithIds, ...themeRecursosMedidasOpenWithIds, ...themeElProblemaOpenWithIds, ...themeEstimacionOpenWithIds, ...themeMetodosComunicacionOpenWithIds ])
	await MultipleChoiceQuestion.insertMany([ ...themeAdministracionEficienteCloseWithIds, ...themeRecursosMedidasCloseWithIds, ...themeElProblemaCloseWithIds, ...themeEstimacionCloseWithIds, ...themeMetodosComunicacionCloseWithIds ])
}

async function run() {
	await connectDB()
	await seed()

	console.log('DAÑOS AÑADIDOS A LA BASE DE DATOS')

	return
}

run()
