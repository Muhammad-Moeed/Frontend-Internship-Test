function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function batchProcessor({ items, batchSize, concurrency, processor, onBatchComplete }) {
    const results = new Array(items.length);
    const totalBatches = Math.ceil(items.length / batchSize);
    let activeCount = 0;
    let currentBatchIndex = 0;

    // ************Process items in batches of specified size***************

    const batches = [];
    for (let i = 0; i < items.length; i += batchSize) {
        batches.push(items.slice(i, i + batchSize).map((item, index) => ({
            item,
            originalIndex: i + index,
        })));
    }

    return new Promise((resolve) => {
        const processNextBatch = async () => {
            if (currentBatchIndex >= totalBatches) return;

            const batchIndex = currentBatchIndex++;
            const batch = batches[batchIndex];
            activeCount++;

            //   ****************Handle errors*****************

            const batchResults = await Promise.all(
                batch.map(async ({ item, originalIndex }) => {
                    try {
                        const result = await processor(item);
                        results[originalIndex] = result;
                        return result;
                    } catch (error) {
                        results[originalIndex] = null;
                        return null;
                    }
                })
            );

            // *************progress callbacks************

            onBatchComplete(batchResults);
            activeCount--;

            if (currentBatchIndex < totalBatches) {
                processNextBatch();
            }

            if (activeCount === 0 && currentBatchIndex >= totalBatches) {
                resolve(results);
            }
        };

        // ***************Maintain concurrency limit**********

        for (let i = 0; i < Math.min(concurrency, totalBatches); i++) {
            processNextBatch();
        }
    });
}


// **************Check Result**************
(async () => {
    const results = await batchProcessor({
        items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        batchSize: 3,
        concurrency: 2,
        processor: async (item) => {
            await delay(Math.random() * 100);
            if (Math.random() < 0.1) throw new Error('Random failure');
            return item * 2;
        },
        onBatchComplete: (batchResults) => {
            console.log('Batch completed:', batchResults);
        }
    });

    console.log('All results:', results);
})();
