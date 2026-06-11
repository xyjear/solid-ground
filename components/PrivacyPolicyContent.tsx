export default function PrivacyPolicyContent() {
  return (
    <div className="bg-dark-800 border border-white/10 rounded-xl p-5 md:p-12 text-white/80 text-sm leading-relaxed space-y-5 max-w-2xl mx-auto">
      <h2 className="text-2xl font-heading font-bold text-gold mb-6">
        Политика конфиденциальности
      </h2>

      <div>
        <h3 className="text-gold font-semibold mb-2">1. Какие данные мы собираем</h3>
        <p>
          При заполнении формы обратной связи на сайте solid-ground.ru мы собираем: имя, номер телефона,
          адрес электронной почты (если указан) и текст комментария.
        </p>
      </div>

      <div>
        <h3 className="text-gold font-semibold mb-2">2. Цель сбора</h3>
        <p>
          Данные используются исключительно для связи с вами: ответ на заявку, расчёт сметы,
          консультация по услугам строительной компании.
        </p>
      </div>

      <div>
        <h3 className="text-gold font-semibold mb-2">3. Правовое основание</h3>
        <p>
          Обработка осуществляется на основании вашего согласия. Отправляя форму, вы подтверждаете,
          что ознакомлены с настоящей политикой и даёте согласие на обработку персональных данных.
        </p>
      </div>

      <div>
        <h3 className="text-gold font-semibold mb-2">4. Передача данных третьим лицам</h3>
        <p>
          Для доставки уведомлений о новых заявках используется сервис Telegram Bot API
          (серверы могут находиться за пределами Российской Федерации). Мы не передаём ваши данные
          третьим лицам для маркетинговых или иных целей.
        </p>
      </div>

      <div>
        <h3 className="text-gold font-semibold mb-2">5. Срок хранения</h3>
        <p>
          Данные хранятся до момента отзыва вашего согласия либо до достижения цели обработки,
          после чего подлежат удалению.
        </p>
      </div>

      <div>
        <h3 className="text-gold font-semibold mb-2">6. Ваши права</h3>
        <p>
          Вы можете в любой момент отозвать согласие на обработку персональных данных
          и потребовать их удаления, направив запрос на нашу электронную почту.
        </p>
      </div>

      <div>
        <h3 className="text-gold font-semibold mb-2">7. Защита данных</h3>
        <p>
          Мы принимаем организационные и технические меры для защиты ваших персональных данных
          от несанкционированного доступа, изменения или уничтожения.
        </p>
      </div>

      <div>
        <h3 className="text-gold font-semibold mb-2">8. Контакты</h3>
        <p>
          По вопросам, связанным с обработкой персональных данных, пишите на
          <a href="mailto:info@solid-ground.ru" className="text-gold hover:underline ml-1">info@solid-ground.ru</a>.
        </p>
      </div>
    </div>
  );
}
