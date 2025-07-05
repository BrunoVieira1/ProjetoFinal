package BackendJava.api.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "stock")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Stock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private Long idProduct;

    @Column(nullable = false)
    private Integer minStock;

    @Column(nullable = false)
    private Integer maxStock;

    @Column(nullable = false)
    private Integer qtt;

}