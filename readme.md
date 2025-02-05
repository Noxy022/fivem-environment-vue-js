# Fivem Environment Vue.js

## Commandes

### Installation des dépendances

Pour commencer, installez les dépendances directement dans le répertoire de production en tapant la commande suivante dans le terminal :

```sh
npm install
```

### Commencer à développer

Une fois les dépendances installées, vous pouvez directement voir un aperçu de votre UI avec cette commande :

```sh
npm run dev
```

### Builder votre projet pour FiveM

Si vous souhaitez compiler votre projet pour FiveM, utilisez cette commande :

```sh
npm run fivem
```

---

## Développement Vue.js pour FiveM

Quelques ajustements sont nécessaires pour intégrer Vue.js à FiveM. Veuillez appliquer les bonnes pratiques suivantes pour garantir un bon fonctionnement.

### Recevoir des événements depuis Lua

Pour recevoir des événements de votre script Lua dans Vue.js, assurez-vous d'attendre que le DOM soit chargé grâce aux hooks du cycle de vie de Vue.

**Exemple :**

```vue
<script setup>
import { onMounted } from "vue";

onMounted(() => {
    window.addEventListener('message', (event) => {
        if (event.data.type === 'OpenMenu') {
            console.log("Menu ouvert depuis Lua !");
        }
    });
});
</script>
```

### Envoyer des événements de Vue.js à Lua (avec jQuery)

#### 1. **Envoyer une requête GET à Lua**

Si vous souhaitez simplement récupérer un événement sans envoyer de données, utilisez la méthode `$.get()`.

```js
const nameScript = 'test_script';
$.get(`https://${nameScript}/closeMenuNuiLocation`, () => {
    console.log("Menu fermé côté Lua");
});
```

#### 2. **Envoyer des données à Lua avec une requête POST**

Pour envoyer des données à Lua, utilisez `$.post()`, en encodant les données avec `JSON.stringify()`.

```js
$.post(`https://${nameScript}/vehicleSpawn`, JSON.stringify({
    name: event.name,
    price: event.price
}), () => {
    console.log("Véhicule spawné avec succès !");
});
```

---

### Gestion des images

Toutes les images doivent être placées dans le dossier `public` de votre projet.
Lors de l'affichage d'une image, utilisez un chemin strictement conforme à ce format :

```vue
<img src="/img/leNomDeVotreImage.jpg" alt="image">
```

⚠️ **Note importante :**
- **N’utilisez pas `./img/`**, car les fichiers dans `public` sont accessibles directement via `/img/...`.
- Si l'image ne s'affiche pas, vérifiez que le fichier est bien présent dans `public/img/`.

