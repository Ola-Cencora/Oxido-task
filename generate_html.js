const fs = require("fs");
const axios = require("axios");
require("dotenv").config();

const apiKey = process.env.OPENAI_API_KEY;

const article = `
Sztuczna inteligencja: wpływ i wyzwania

Sztuczna inteligencja to dziedzina nauki i technologii zajmująca się tworzeniem maszyn i programów zdolnych do wykonywania zadań wymagających ludzkiej inteligencji, takich jak uczenie się, rozumienie języka naturalnego i podejmowanie decyzji. AI stała się integralną częścią naszego codziennego życia, od asystentów głosowych w smartfonach, jak Siri czy Google Assistant, po systemy rekomendacyjne na platformach streamingowych, takich jak Netflix czy Spotify. Wspiera nas w planowaniu tras, automatyzacji domowych urządzeń oraz w komunikacji. Obecnie jest o niej bardzo głośno chociażby za sprawą dużych modeli językowych, jak ChatGPT.

Rozwój uczenia maszynowego i głębokiego uczenia umożliwił tworzenie zaawansowanych modeli, które potrafią samodzielnie rozwiązywać skomplikowane problemy. Sieci neuronowe analizują ogromne ilości danych w obszarach takich jak rozpoznawanie obrazów czy przetwarzanie języka naturalnego. Dzięki temu AI nie tylko przetwarza dane, ale także podejmuje decyzje, wcześniej zarezerwowane dla ludzi.

Wyzwania etyczne i społeczne

Kluczowym wyzwaniem jest zapewnienie etycznego i odpowiedzialnego rozwoju AI. Należy zwracać uwagę na uprzedzenia w danych treningowych, które mogą prowadzić do dyskryminacji, oraz na wpływ AI na prywatność i nierówności społeczne. Ważne jest opracowanie ram etycznych i mechanizmów nadzoru regulujących rozwój i wdrażanie AI, a także włączanie różnych grup społecznych w ten proces. Transparentność działań firm i instytucji może pomóc w budowaniu zaufania do technologii.

Badacze pracują nad rozwiązaniami umożliwiającymi harmonijne współistnienie ludzi i AI, koncentrując się na tworzeniu systemów wspierających człowieka, a nie go zastępujących. Istotne jest opracowywanie mechanizmów współpracy między człowiekiem a maszyną, co sprzyja synergii i skutecznej komunikacji.

Automatyzacja i przyszłość rynku pracy

Automatyzacja procesów dzięki AI przynosi korzyści w postaci zwiększonej efektywności i redukcji kosztów. Jednak istnieją obawy dotyczące wpływu na rynek pracy i potencjalnego zastąpienia ludzi przez maszyny. Kluczowe jest przemyślane podejście do transformacji rynku pracy, inwestycja w edukację i przekwalifikowanie pracowników, aby mogli oni znaleźć nowe role w gospodarce przyszłości.

Specjaliści powinni być gotowi na ciągłe doskonalenie swoich umiejętności, ucząc się m.in. zasad działania algorytmów AI. Przyszłość pracy będzie wymagać nie tylko umiejętności technicznych, ale także kompetencji miękkich, takich jak kreatywność i zdolność rozwiązywania problemów.

Nasza zdolność do adaptacji i innowacji zdecyduje o tym, jak AI wpłynie na przyszłość ludzkości. Wspólnie możemy kształtować tę przyszłość, wykorzystując AI dla dobra wszystkich.
`;

async function generateHTMLFromArticle(article) {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "Jesteś asystentem generującym kod HTML.",
          },
          {
            role: "user",
            content: `Przekonwertuj ten artykuł na kod HTML. Użyj tagów HTML do strukturyzacji treści. Dodaj miejsca na grafiki z tagiem <img>, z atrybutem src="image_placeholder.jpg" oraz atrybutem alt z dokładnym promptem do generowania obrazków. Zwrócony kod powinien zawierać wyłącznie zawartość do wstawienia pomiędzy tagami <body> i </body>. Nie dołączaj znaczników <html>, <head> ani <body>.`,
          },
          {
            role: "user",
            content: article,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Błąd w komunikacji z API:", error);
  }
}

(async () => {
  console.log("Generuję kod HTML z artykułu...");
  const htmlContent = await generateHTMLFromArticle(article);

  if (htmlContent) {
    fs.writeFileSync("artykul.html", htmlContent);
    console.log("Kod HTML został zapisany w pliku artykul.html.");
  } else {
    console.log("Nie udało się wygenerować kodu HTML.");
  }
})();
