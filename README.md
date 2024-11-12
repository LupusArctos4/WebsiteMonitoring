# WebsiteMonitoring
This repository demonstrates how to monitor changes on a website using Distill Web Monitor, receive alerts via email, and automatically forward those alerts to a Discord channel using a Google Apps Script that sends notifications through a Discord webhook.

--------------------------------

# Website Monitoring with Distill Web Monitor and Discord Notifications via Google Apps Script

This project demonstrates how to monitor changes on a website using Distill Web Monitor, receive alerts via email, and automatically forward those alerts to a Discord channel using a Google Apps Script that sends notifications through a Discord webhook.

## Features

- **Automated Website Monitoring**: Use Distill Web Monitor to track changes on a specific website.
- **Email Notifications**: Receive email alerts when changes are detected.
- **Discord Integration**: Utilize a Google Apps Script to automatically send these alerts to a Discord channel via a webhook.

## Prerequisites

- **Gmail Account**: To receive alerts from Distill Web Monitor.
- **Discord Account**: With permissions to create a webhook in the desired channel.
- **Access to Google Apps Script**: To run the automated script.

## Installation

1. **Set up Distill Web Monitor**:

   - Add the website you want to monitor in Distill Web Monitor.
   - Configure Distill to send alerts to your Gmail address every hour or at your desired frequency.

2. **Create a Discord Webhook**:

   - Open Discord and navigate to the settings of the channel where you want to receive notifications.
   - Create a new webhook and copy the webhook URL.

3. **Configure the Google Apps Script**:

   - Go to [Google Apps Script](https://script.google.com/) and create a new project.
   - Paste the provided JavaScript code into the editor.
   - Replace `URL_WEBHOOK_DISCORD` with your Discord webhook URL.
   - Replace `ID_DISCORD` with your Discord user ID if you wish to be mentioned.

   ```javascript
   function checkEmails() {
     var webhookUrl = "URL_WEBHOOK_DISCORD"; // !!!!!!!!!!!!!!
     var query = 'from:alert@distill.io is:unread'; // Configured for Distill Web Monitor
     var threads = GmailApp.search(query, 0, 5);
     
     for (var i = 0; i < threads.length; i++) {
       var thread = threads[i];
       var messages = thread.getMessages();
       
       for (var j = 0; j < messages.length; j++) {
         var message = messages[j];
         if (!message.isUnread()) {
           continue; // Ignore read messages
         }
         
         var subject = message.getSubject();
         var body = message.getPlainBody();
         // Divide the body into lines
         var lines = body.split('\n');
   
         // Check that there are at least two lines
         if (lines.length >= 2) {
           var secondLine = lines[1];
           
           // Find the position of the string '<You>can unsubscribe'
           var marker = '<You>can unsubscribe';
           var index = secondLine.indexOf(marker);
           
           // Extract text before marker
           var desiredText;
           if (index !== -1) {
             desiredText = secondLine.substring(0, index);
           } else {
             // If marker not found, use entire line
             desiredText = secondLine;
           }
         } else {
           // If there is no second line, define desiredText as empty or a default message
           var desiredText = '';
         }
   
         // Create payload for Discord
         var payload = {
           "content": "# " + subject + "\n <@ID_DISCORD>\n" + desiredText // !!!!!!!!!!!!!!
         };
         
         var options = {
           "method": "post",
           "contentType": "application/json",
           "payload": JSON.stringify(payload)
         };
         
         // Send message to Discord
         UrlFetchApp.fetch(webhookUrl, options);
         
         // Mark message as read
         message.markRead();
       }
     }
   }
   ```

4. **Set Up the Automatic Trigger**:

   - In Google Apps Script, go to **Edit > Current project's triggers**.
   - Add a new trigger to run `checkEmails` every hour or at your desired frequency.

## Usage

Once set up, the script will automatically check your Gmail inbox for unread Distill Web Monitor alerts and send them to your specified Discord channel.

Ensure the script has the necessary permissions to access Gmail and make external network requests.

--------------------------------

# Surveillance de site web avec Distill Web Monitor et notifications Discord via Google Apps Script

Ce projet montre comment surveiller les changements d'un site web en utilisant Distill Web Monitor, recevoir des alertes par email, puis transférer automatiquement ces alertes à un canal Discord en utilisant un script Google Apps Script qui envoie des notifications via un webhook Discord.

## Fonctionnalités

- **Surveillance automatisée du site web** : Utilisez Distill Web Monitor pour surveiller les changements sur un site web spécifique.
- **Notification par email** : Recevez des alertes par email lorsque des changements sont détectés.
- **Intégration Discord** : Utilisez un script Google Apps Script pour envoyer automatiquement ces alertes à un canal Discord via un webhook.

## Prérequis

- **Compte Gmail** : Pour recevoir les alertes de Distill Web Monitor.
- **Compte Discord** : Avec les permissions pour créer un webhook dans le canal souhaité.
- **Accès à Google Apps Script** : Pour exécuter le script automatisé.

## Installation

1. **Configurer Distill Web Monitor** :

   - Ajoutez le site web que vous souhaitez surveiller dans Distill Web Monitor.
   - Configurez Distill pour envoyer des alertes à votre adresse email Gmail toutes les heures ou selon la fréquence souhaitée.

2. **Créer un webhook Discord** :

   - Ouvrez Discord et accédez aux paramètres du canal où vous souhaitez recevoir les notifications.
   - Créez un nouveau webhook et copiez l'URL du webhook.

3. **Configurer le script Google Apps Script** :

   - Accédez à [Google Apps Script](https://script.google.com/) et créez un nouveau projet.
   - Collez le code JavaScript fourni dans l'éditeur.
   - Remplacez `URL_WEBHOOK_DISCORD` par l'URL de votre webhook Discord.
   - Remplacez `ID_DISCORD` par votre identifiant Discord si vous souhaitez être mentionné.

   ```javascript
   function checkEmails() {
     var webhookUrl = "https://discord.com/api/webhooks/";
     var query = 'from:alert@distill.io is:unread'; // Modifier l'adresse e-mail si nécessaire
     var threads = GmailApp.search(query, 0, 5); // Vous pouvez ajuster le nombre d'e-mails à vérifier
     
     for (var i = 0; i < threads.length; i++) {
       var thread = threads[i];
       var messages = thread.getMessages();
       
       for (var j = 0; j < messages.length; j++) {
         var message = messages[j];
         if (!message.isUnread()) {
           continue; // Ignorer les messages déjà lus
         }
         
         var subject = message.getSubject();
         var body = message.getPlainBody();
         // Diviser le corps en lignes
         var lines = body.split('\n');
   
         // Vérifier s'il y a au moins deux lignes
         if (lines.length >= 2) {
           var secondLine = lines[1];
           
           // Trouver la position de la chaîne '<You>can unsubscribe'
           var marker = '<You>can unsubscribe';
           var index = secondLine.indexOf(marker);
           
           // Extraire le texte avant le marqueur
           var desiredText;
           if (index !== -1) {
             desiredText = secondLine.substring(0, index);
           } else {
             // Si le marqueur n'est pas trouvé, utiliser toute la ligne
             desiredText = secondLine;
           }
         } else {
           // S'il n'y a pas de seconde ligne, définir desiredText comme vide ou un message par défaut
           var desiredText = '';
         }
   
         // Créer le payload pour Discord
         var payload = {
           "content": "# " + subject + "\n<@299948231259979778>\n" + desiredText
         };
         
         var options = {
           "method": "post",
           "contentType": "application/json",
           "payload": JSON.stringify(payload)
         };
         
         // Envoyer le message à Discord
         UrlFetchApp.fetch(webhookUrl, options);
         
         // Marquer le message comme lu
         message.markRead();
       }
     }
   }
   ```

4. **Configurer le déclencheur automatique** :

   - Dans Google Apps Script, allez dans **Édition > Déclencheurs du projet actuel**.
   - Ajoutez un déclencheur pour exécuter `checkEmails` toutes les heures ou selon la fréquence souhaitée.

## Utilisation

Une fois configuré, le script vérifiera automatiquement votre boîte de réception Gmail pour les alertes non lues de Distill Web Monitor et les enverra à votre canal Discord spécifié.

Assurez-vous que le script est autorisé à accéder à Gmail et à effectuer des requêtes réseau externes.
